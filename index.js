require('dotenv').config()

const app = require('./server')

const { connectDb } = require('./db.connection')

connectDb()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
