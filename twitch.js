require('dotenv').config()
const TwitchApi = require('node-twitch').default

const twitch = new TwitchApi({
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_SECRET
})

module.exports.checkLive = async (channels) => {
  let streams = await twitch.getStreams({ channels })
  streams = streams.data || []
  streams = streams.map((item) => item.user_name)
  return streams
}
