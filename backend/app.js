require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const addDeviceRouter = require('./src/routes/addDevice')
const getDevicesListRouter = require('./src/routes/getDevicesList')
const changeStatusRouter = require('./src/routes/changeStatus')
const deleteDeviceRouter = require('./src/routes/deleteDevice')
const updateDeviceRouter = require('./src/routes/updateDevice')
const setDeviceWarningRouter = require('./src/routes/setDeviceWarning')
const isBeingEditedRouter = require('./src/routes/isBeingEdited')
const indexRouter = require('./src/routes/index')
const mainRouter = require('./src/routes/main')
const PORT = process.env.PORT
const cors = require('cors')
const sequelize = require('./src/config/db')
const { QueryTypes } = require('sequelize')

async function dbConnect() {
  try {
    await sequelize.sync()
    app.listen(PORT, () => {
    console.log('Server listening on port: ', PORT)
})
  } catch (e) {
    console.log(e);
  }
}
dbConnect()

app.set('session cookie name', 'sid')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve('../frontend/build')))
app.use('/', mainRouter)
app.use('/addDevice', addDeviceRouter)
app.use('/getDevices', getDevicesListRouter)
app.use('/changeStatus', changeStatusRouter)
app.use('/deleteDevice', deleteDeviceRouter)
app.use('/updateDevice', updateDeviceRouter)
app.use('/setDeviceWarning', setDeviceWarningRouter)
app.use('/isBeingEdited', isBeingEditedRouter)
app.use('*', indexRouter)

module.exports = app
