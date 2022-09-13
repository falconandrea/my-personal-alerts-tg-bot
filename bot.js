module.exports.startBot = (token, webhookBaseUrl) => {
  const { Telegraf } = require('telegraf')
  const bot = new Telegraf(token)

  bot.start((ctx) => ctx.reply("Welcome, I'm your personal alerts bot"))
  bot.help((ctx) => ctx.reply("For now I haven't commands for you"))

  bot.command('ciao', (ctx) => {
    console.log(ctx.message)
    ctx.reply(`Ciao! ${ctx.message.from.first_name}`)
  })

  bot.launch().then(() => console.log('🚀 Bot started!'))

  // Set webhook
  const path = `/telegraf/${bot.secretPathComponent()}`
  const url = new URL(path, webhookBaseUrl).href
  bot.telegram.setWebhook(url).then(() => {
    console.log('Webhook is set!: ', url)
  })

  return bot
}
