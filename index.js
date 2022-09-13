require('dotenv').config()

const app = require('./server')

// Connect to DB
const { connectDb } = require('./db.connection')

connectDb()

// Connect to Telegram BOT
const { startBot } = require('./bot')

const botToken = process.env.BOT_TOKEN
const webHookUrl = process.env.WEBHOOK_BASE_URL
if (!botToken) {
  console.error('Missing BOT_TOKEN in env file')
  process.exit(1)
}
if (!webHookUrl) {
  console.error('Missing WEBHOOK_BASE_URL in env file')
  process.exit(1)
}
const bot = startBot(botToken, webHookUrl)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
