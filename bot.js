const { count } = require('./models/user.model')
const { getReplyText } = require('./utils')

module.exports.startBot = (token, webhookBaseUrl) => {
  const { Telegraf } = require('telegraf')
  const bot = new Telegraf(token)
  const userController = require('./controllers/user.controller')



  // Start command
  bot.start((ctx) => {
    ctx.reply(getReplyText(ctx.message.from.language_code, 'welcome'))
  })

  // Help command
  bot.help((ctx) => {
    ctx.reply(getReplyText(ctx.message.from.language_code, 'help'))
  })

  // Register to the service
  bot.command('register', async (ctx) => {
    // Check if user just saved in db
    const result = await userController.search({ id: ctx.message.from.id })
    if (result.status === 200 && result.data.length > 0) {
      return ctx.reply(getReplyText(ctx.message.from.language_code, 'just_registered'))
    }

    // Save user data in db
    const userResult = await userController.create({
      id: ctx.message.from.id,
      username: ctx.message.from.username,
      first_name: ctx.message.from.first_name,
      language_code: ctx.message.from.language_code
    })

    if (userResult.status !== 200) {
      return ctx.reply(
        `${getReplyText(ctx.message.from.language_code, 'general_error')}: ${userResult.message}`
      )
    }

    return ctx.reply(getReplyText(ctx.message.from.language_code, 'correct_register'))
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
