import axios from "axios";
async function createW2GRoom(uri){
      const { data } = await axios.post('https://w2g.tv/rooms/create.json',  {
        "w2g_api_key": process.env.W2G_API_KEY,
        "share": uri,
        "bg_color": "#2a354c",
        "bg_opacity": "85"
      }).catch(e => (console.log(e)))
      console.log("https://w2g.tv/rooms/" + data.streamkey);
  }
  export default createW2GRoom;