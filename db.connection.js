require('dotenv').config()
const mongoose = require('mongoose')

let dbConnection = ''
if (process.env.NODE_ENV === 'production') {
  dbConnection = process.env.MONGO_URI_PROD
} else if (process.env.NODE_ENV === 'test') {
  dbConnection = process.env.MONGO_URI_TEST
} else {
  dbConnection = process.env.MONGO_URI
}

const connect = async () => {
  await mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports.connectDb = async () => {
  await connect()
    .then(() => {
      console.log('Connected to db')
    })
    .catch((error) => {
      console.error(error.message)
    })
}

module.exports.dropAndCloseDb = async () => {
  await connect()
    .then(async () => {
      await mongoose.connection.db.dropDatabase()
      await mongoose.connection.close()
      await mongoose.disconnect()
    })
    .catch((error) => {
      console.error(error.message)
    })
}
