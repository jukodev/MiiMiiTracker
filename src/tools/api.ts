#!/usr/bin/env node

const axios = require('axios');
const helpers = require('./helpers');
require('dotenv');

async function createW2GRoom(uri: string): Promise<string> {
  const { data } = await axios
    .post('https://api.w2g.tv/rooms/create.json', {
      w2g_api_key: process.env.W2G_API_KEY,
      share: uri,
      bg_color: '#2a354c',
      bg_opacity: '85'
    })
    .catch((e: Error) => {
      helpers.log(e);
    });
  return await Promise.resolve(`https://w2g.tv/rooms/${data.streamkey}`);
}

module.exports = { createW2GRoom };
