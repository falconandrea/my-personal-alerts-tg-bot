const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const botRoutes = require('./routes/bot.routes')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/bot', botRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Unknown endpoint' })
  next()
})

module.exports = app
