const fs = require('fs');
const { REST } = require('@discordjs/rest');

const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Routes
} = require('discord.js');
require('dotenv');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_KEY);

async function setCommands(): Promise<void> {
  const commands = [
    {
      name: 'watch',
      description: 'creates W2G room',
      options: [
        {
          name: 'url',
          description: 'video to watch',
          type: 3,
          required: true
        }
      ]
    }
  ];

  await rest
    .put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_APPID,
        process.env.GUILD_ID
      ),
      { body: commands }
    )
    .then(() => log('Registered commands'))
    .catch(log);
}

function log(str: string): void {
  // const date = new Date();
  // console.log('[' + date.toString().split(' GMT')[0] + '] ' + str);
  console.log(str);
}

function readDB(): dbScheme {
  const raw = fs.readFileSync('./storage/db.json');
  return JSON.parse(raw);
}
function writeDB(data: dbScheme): void {
  const temp = JSON.stringify(data);
  fs.writeFileSync('./storage/db.json', temp);
}
function generateEmbed(
  url: string,
  title: string,
  imageUrl: string,
  videoLength: string
): void {
  return new EmbedBuilder()
    .setColor(0xfed962)
    .setTitle(title.length > 0 ? title : 'error')
    .setURL(url.length > 0 ? url : 'error')
    .setAuthor({
      name: 'Neuer MiiMii Banger',
      iconURL:
        'https://yt3.ggpht.com/ytc/AMLnZu9G_2Tt4d2Sf3xHoCEN_JW3eL4bDqD7OiTHnJGimA=s88-c-k-c0x00ffffff-no-rj',
      url: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.redd.it%2F5w0mamdmiiw51.png&sp=1664462847T92ca9a67b9aff6782f28aa89d1a944ca17db71ea0aad0a1d55ba543fbc5a9ac7'
    })
    .setImage(imageUrl)
    .setTimestamp()

    .setFooter({
      text: videoLength.length > 0 ? videoLength : 'error'
    });
}

function generateButton(url: string): any {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('Rein in den Lachs')
      .setURL(url)
  );
}

interface dbScheme {
  lastVideo: string;
  lastRoom: string;
  allVideos: string[];
}

module.exports = {
  readDB,
  writeDB,
  generateButton,
  generateEmbed,
  log,
  setCommands
};
