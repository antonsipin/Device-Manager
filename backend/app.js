require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const deviceRouter = require('./src/routes/devices')
const indexRouter = require('./src/routes/index')
const mainRouter = require('./src/routes/main')
const PORT = process.env.PORT
const cors = require('cors')
const sequelize = require('./src/config/db')

async function dbConnect() {
  try {
    await sequelize.sync()
    app.listen(PORT, () => {
    console.log('Server listening on port: ', PORT)
})
  } catch (e) {
    console.log(e.message)
  }
}
dbConnect()

app.set('session cookie name', 'sid')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve('../frontend/build')))
app.use('/', mainRouter)
app.use('/devices', deviceRouter)
app.use('*', indexRouter)

module.exports = app
