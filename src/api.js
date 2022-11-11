import { post } from 'axios';
import { log } from './helpers';
import 'dotenv';

async function createW2GRoom(uri) {
  const { data } = await post('https://api.w2g.tv/rooms/create.json', {
    w2g_api_key: process.env.W2G_API_KEY,
    share: uri,
    bg_color: '#2a354c',
    bg_opacity: '85'
  }).catch((e) => {
    log(e);
  });
  return Promise.resolve('https://w2g.tv/rooms/' + data.streamkey);
}

export default { createW2GRoom };
