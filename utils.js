const messages = []
messages.it = require('./i18n/it.json')
messages.en = require('./i18n/en.json')

const getReplyText = (language, type) => {
  return messages[language]
  ? messages[language][type]
  : messages['en'][type]
}


module.exports = {
  getReplyText
}
