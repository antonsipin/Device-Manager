require('dotenv').config()
const sequelize = require('../config/db')
const Device = require('../models/device.model')

const isBeingEdited = async (req, res) => {
  try {
    const { id, status } = req.body
    await sequelize.query(`UPDATE "Devices" SET "isBeingEdited" = ${status} WHERE id = ${id}`)
    res.status(201).json({ result: 'Successfully', error: ''})
  } catch (err) {
    res.status(500).json({ 
      result: 'Error' ,
      error: err.message
    })
  }
}

const setDeviceWarning = async (req, res) => {
  try {
    const { id, warningStatus } = req.body
    await sequelize.query(`UPDATE "Devices" SET warning = ${warningStatus} WHERE id = ${id}`)
    res.status(201).json({ result: 'Successfully', error: ''})
  } catch (err) {
    res.status(500).json({ 
      result: 'Error' ,
      error: err.message
    })
  }
}

const updateDevice = async (req, res) => {
  try {
    const { id, name } = req.body
    const devicesList = await sequelize.query(`SELECT * from "Devices"`)
    const names = devicesList[0].map(el => el.name)

      if (names.includes(name)) {
         res.status(400).json({ error: 'This name already exists' })
      } else {
        await sequelize.query(`UPDATE "Devices" SET name = '${name}' WHERE id = ${id}`)
        res.status(200).json({ result: 'Successfully', error: ''})
      }
  } catch (err) {
    res.status(500).json({
      result: 'Error' ,
      error: err.message
    })
  }
}

const deleteDevice = async (req, res) => {
  try {
    const { id } = req.body
    await Device.destroy({ where: { id: id } })
    res.status(200).json({ result: 'Successfully', error: ''})
  } catch (err) {
    res.status(500).json({ 
      result: 'Error' ,
      error: err.message
    })
  }
}

const changeStatus = async (req, res) => {
  try {
    const { id, powerStatus } = req.body
    await sequelize.query(`UPDATE "Devices" SET status = ${powerStatus} WHERE id = ${id}`)
    res.status(200).json({ result: 'Successfully', error: ''})
  } catch (err) {
    res.status(500).json({ 
      result: 'Error' ,
      error: err.message
    })
  }
}

const addDevice = async (req, res) => {
  try {
    const { device } = req.body
    const devicesList = await sequelize.query(`SELECT name from "Devices"`)
    const names = devicesList[0].map(el => el.name)

      if (names.includes(device)) {
         res.status(400).json({ error: 'This name already exists' })
      } else {
            await sequelize.query(
              `INSERT INTO "Devices" (name, status, warning, "isBeingEdited", "createdAt", "updatedAt") VALUES 
              ('${device}', false, false, false, now(), now()) `)
            res.status(201).json({ result: 'Successfully', error: ''})
        }
  } catch (err) {
    res.status(500).json({
      result: 'Error' ,
      error: err.message
    })
  }
}

const getDevicesList = async (req, res) => {
  try {
    const devicesList = await Device.findAll()
    res.status(200).json(devicesList)
  } catch (err) {
    res.status(500).json({ 
      result: 'Error' ,
      error: err.message
    })
  }
}

module.exports = {
  addDevice,
  getDevicesList,
  changeStatus,
  deleteDevice,
  updateDevice,
  setDeviceWarning,
  isBeingEdited
}
