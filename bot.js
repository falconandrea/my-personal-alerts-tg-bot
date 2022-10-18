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
    if (result.status === 200 && result.data) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'just_registered')
      )
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
        `${getReplyText(ctx.message.from.language_code, 'general_error')}: ${
          userResult.message
        }`
      )
    }

    return ctx.reply(
      getReplyText(ctx.message.from.language_code, 'correct_register')
    )
  })

  // List channels followed
  bot.command('list', async (ctx) => {
    // Check if user is registered
    const result = await userController.search({ id: ctx.message.from.id })
    if ((result.status === 200 && !result.data) || result.status === 500) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'need_register')
      )
    }

    // Check list of channels
    const channels = result.data.follow
    if (channels.length === 0) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'no_followed_channels')
      )
    }

    return ctx.reply(
      `${getReplyText(
        ctx.message.from.language_code,
        'channels_followed'
      )} ${channels.join(', ')}`
    )
  })

  // Follow new channel
  bot.command('follow', async (ctx) => {
    // Check if user is registered
    const result = await userController.search({ id: ctx.message.from.id })
    if ((result.status === 200 && !result.data) || result.status === 500) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'need_register')
      )
    }

    // Check channel to follow
    if (
      ctx.message.text.split(' ').length <= 1 ||
      !ctx.message.text.split(' ')[1]
    ) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'need_channel_to_follow')
      )
    }

    const newChannel = ctx.message.text.split(' ')[1]
    const channels = result.data.follow

    // Check if you just following the channel
    if (channels.includes(newChannel)) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'just_followed')
      )
    }

    // Add channel to followed channales and save into db
    await userController.follow(newChannel, result.data.id)
    return ctx.reply(
      getReplyText(ctx.message.from.language_code, 'channel_added')
    )
  })

  // Unfollow new channel
  bot.command('unfollow', async (ctx) => {
    // Check if user is registered
    const result = await userController.search({ id: ctx.message.from.id })
    if ((result.status === 200 && !result.data) || result.status === 500) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'need_register')
      )
    }

    // Check channel to unfollow
    if (
      ctx.message.text.split(' ').length <= 1 ||
      !ctx.message.text.split(' ')[1]
    ) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'need_channel')
      )
    }

    const newChannel = ctx.message.text.split(' ')[1]
    const channels = result.data.follow

    // Check if you are following the channel
    if (!channels.includes(newChannel)) {
      return ctx.reply(
        getReplyText(ctx.message.from.language_code, 'not_followed')
      )
    }

    // Remove channel to followed channales and save into db
    await userController.unfollow(newChannel, result.data.id)
    return ctx.reply(
      getReplyText(ctx.message.from.language_code, 'channel_removed')
    )
  })

  // Start bot
  bot.launch().then(() => console.log('🚀 Bot started!'))

  // Set webhook
  const path = `/telegraf/${bot.secretPathComponent()}`
  const url = new URL(path, webhookBaseUrl).href
  bot.telegram.setWebhook(url).then(() => {
    console.log('Webhook is set!: ', url)
  })

  return bot
}
