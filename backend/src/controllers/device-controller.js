require('dotenv').config()
const { QueryTypes } = require('sequelize')
const sequelize = require('../config/db')
const Device = require('../models/device.model')

const isBeingEdited = async (req, res) => {
  try {
    const { id, status } = req.body
    await sequelize.query('UPDATE "Devices" SET "isBeingEdited"=? WHERE id=?', { 
      type: QueryTypes.UPDATE,
      replacements: [ status, id ] 
    })
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
    await sequelize.query('UPDATE "Devices" SET warning=? WHERE id=?', {
      type: QueryTypes.UPDATE,
      replacements: [ warningStatus, id ]
    })
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
    const devices = await sequelize.query('SELECT * from "Devices"', { type: QueryTypes.SELECT })
    const names = devices.map(el => el.name)

      if (names.includes(name)) {
         res.status(400).json({ error: 'This name already exists' })
      } else {
        await sequelize.query('UPDATE "Devices" SET name=? WHERE id=?', {
          type: QueryTypes.UPDATE,
          replacements: [name, id]
        })
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
    await sequelize.query('DELETE from "Devices" WHERE id=?', {
      type: QueryTypes.DELETE,
      replacements: [ id ]
    })
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
    await sequelize.query('UPDATE "Devices" SET status=? WHERE id=?', {
      type: QueryTypes.UPDATE,
      replacements: [ powerStatus, id ]
    })
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
    const devices = await sequelize.query(`SELECT name FROM "Devices"`, { type: QueryTypes.SELECT })
    const names = devices.map(el => el.name)

      if (names.includes(device)) {
         res.status(400).json({ error: 'This name already exists' })
      } else {
            await sequelize.query(
              `INSERT INTO "Devices" (name, status, warning, "isBeingEdited", "createdAt", "updatedAt") VALUES 
              (${device}, false, false, false, now(), now())`, {
                type: QueryTypes.INSERT
              })
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
    const DevicesList = await sequelize.query('Select * from "Devices"', { type: QueryTypes.SELECT })
    res.status(200).json(DevicesList)
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
