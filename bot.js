module.exports.startBot = (token) => {
  const { Telegraf } = require('telegraf')
  const bot = new Telegraf(token)

  bot.start((ctx) => ctx.reply("Welcome, I'm your personal alerts bot"))
  bot.help((ctx) => ctx.reply("For now I haven't commands for you"))

  bot.command('ciao', (ctx) => {
    console.log(ctx.message)
    ctx.reply(`Ciao! ${ctx.message.from.first_name}`)
  })

  return bot
}
