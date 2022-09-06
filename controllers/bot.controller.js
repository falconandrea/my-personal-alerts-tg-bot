const mongoose = require('mongoose')
const Model = require('../models/bot.model')

const index = async (req, res) => res.status(200).json({ message: 'ok' })

module.exports = {
  index
}
