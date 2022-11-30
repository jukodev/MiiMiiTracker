#!/usr/bin/env node

import { Channel } from 'discord.js';

export {};
require('dotenv').config();
const process = require('process');
const helpers = require('./tools/helpers');
const { Client, GatewayIntentBits } = require('discord.js');
const api = require('./tools/api');
const axios = require('axios');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let channel: any; // ODO: find correct Channel type

function init(): void {
  process.title = 'MiiMiiTracker';
  // helpers.setCommands();

  client.login(process.env.DISCORD_KEY);
}

client.on('ready', () => {
  helpers.log(
    `Connected to discord as ${client.user.tag}, running as ${process.title}`
  );
  client.channels.fetch(process.env.DISCORD_CHANNEL).then((ch: Channel) => {
    channel = ch;
  });
});

setInterval(() => {
  getLatestVideo();
}, process.env.DELAY);

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand) return;
  if (interaction.commandName === 'watch') {
    const url = interaction.options.get('url').value;
    api.createW2GRoom(url).then((res: string) => {
      interaction.reply(res);
      helpers.log(`created w2g room for ${url}`);
    });
  }
});

interface Interaction {
  isChatInputCommand: boolean;
  commandName: string;
  options: {
    get: any;
  };
  reply: any;
}

function sendMessageToServer(msg: string): void {
  channel.send(msg);
}

function getLatestVideo(): void {
  axios
    .get(process.env.YOUTUBE_CHANNEL)
    .then((res: any) => {
      const html: string = res.data;
      let indice = html.indexOf('WEB_PAGE_TYPE_WATCH');
      let short = html.substring(indice - 50, indice);
      indice = short.indexOf('/watch');
      const indice2 = short.indexOf('","');
      const url = 'https://youtube.com' + short.substring(indice, indice2);
      indice = html.indexOf('"runs":[{"text"');
      short = html.substring(indice + 17, indice + 200);
      indice = short.indexOf('"}]');
      const name = short.substring(0, indice);
      indice = html.indexOf('"thumbnailOverlayTimeStatusRenderer"');
      short = html.substring(indice + 93, indice + 200);
      indice = short.indexOf('"}');
      let duration = short.substring(0, indice);
      duration = duration.replace(' Minuten, ', ':').replace(' Sekunden', '');
      if (duration.split(':')[1].length < 2) {
        duration = duration.split(':')[0] + ':0' + duration.split(':')[1];
      }
      indice = html.indexOf('[{"url":');
      short = html.substring(indice + 9, indice + 300);
      indice = short.indexOf('","');
      const thumbnail = short.substring(0, indice);
      const data: videoData = { url, name, thumbnail, duration };
      processVideo(data);
    })
    .catch((e: Error) => console.log(e));
}

function processVideo(data: videoData): void {
  try {
    const lastId = helpers.readDB().lastVideo;
    const allVids: string[] = helpers.readDB().allVideos;
    if (
      data !== null &&
      data.name.length > 0 &&
      data.url.length > 0 &&
      data.thumbnail.length > 0 &&
      data.duration.length > 0 &&
      lastId !== data.url &&
      data.url !== 'https://youtube.com' &&
      !allVids.includes(data.url)
    ) {
      helpers.log('siuuuu');
      api.createW2GRoom(data.url).then((w2g: string) => {
        channel.send({
          embeds: [
            helpers.generateEmbed(
              data.url,
              data.name,
              data.thumbnail,
              data.duration
            )
          ],
          components: [helpers.generateButton(w2g)]
        });
        allVids.push(data.url);
        helpers.writeDB({
          lastVideo: data.url,
          lastRoom: w2g,
          allVideos: allVids
        });
        helpers.log('sent new video: ' + data.name);
      });
    }
  } catch (error) {
    helpers.log(error);
  }
}

interface videoData {
  url: string;
  name: string;
  thumbnail: string;
  duration: string;
}

module.exports = {
  init,
  sendMessageToServer
};
