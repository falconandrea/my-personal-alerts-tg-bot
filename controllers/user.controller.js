const { ObjectId } = require('mongoose').Types
const Model = require('../models/user.model')

// Validator function
const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true
    }
    return false
  }
  return false
}

const create = async (data) => {
  if (!data.id) {
    return { status: 500, message: 'Missing Telegram ID User' }
  }
  if (!data.username) {
    return { status: 500, message: 'Missing username' }
  }
  if (!data.first_name) {
    return { status: 500, message: 'Missing first name' }
  }

  const result = new Model({
    id: data.id,
    username: data.username,
    first_name: data.first_name,
    language: data.language_code ? data.language_code : 'it'
  })
  await result.save().catch((err) => ({
    status: 500,
    message: err.message || 'Some error occurred while saving the user'
  }))
  return { status: 200, message: 'Created' }
}

const search = async (data) => {
  const result = await Model.find(data)
  if (result) {
    return { status: 200, message: 'Found', data: result }
  }
  return { status: 500, message: 'User not found' }
}

module.exports = {
  search,
  create
}
