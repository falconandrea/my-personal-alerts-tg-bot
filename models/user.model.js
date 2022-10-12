const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'it'
  },
  follow: {
    type: [String],
    default: []
  },
  updated: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', UserSchema)
