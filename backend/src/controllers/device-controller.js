require('dotenv').config()
const Device = require('../models/device.model')

const isBeingEdited = async (req, res) => {

  const { id, isBeingEdited } = req.body

  try {
    await Device.update({ isBeingEdited: !isBeingEdited }, { where: { id: id } })
    const devicesList = await Device.findAll()
    res.status(201).json(devicesList)
  } catch (err) {
    res.sendStatus(500).json({ 
      message: err.message
    })
  }
}

const setDeviceWarning = async (req, res) => {

  const { id, warning } = req.body

  try {
    await Device.update({ warning: !warning }, { where: { id: id } } )
    const devicesList = await Device.findAll()
    res.status(201).json(devicesList)
  } catch (err) {
    res.sendStatus(500).json({ 
      message: err.message
    })
  }
}

const updateDevice = async (req, res) => {

  const { id, name } = req.body

  try {
    await Device.update( { name: name }, { where: { id: id } })
    const devicesList = await Device.findAll()
    res.status(201).json(devicesList)
  } catch (err) {
    res.sendStatus(500).json({ 
      message: err.message
    })
  }
}

const deleteDevice = async (req, res) => {

  const { id } = req.body

  try {
    await Device.destroy({ where: { id: id } })
    const devicesList = await Device.findAll()
    res.status(201).json(devicesList)
  } catch (err) {
    res.sendStatus(500).json({ 
      message: err.message
    })
  }
}

const changeStatus = async (req, res) => {

  const { id, status } = req.body

  try {
    await Device.update({ status: !status }, { where: { id: id } })
    const devicesList = await Device.findAll()
    res.status(201).json(devicesList)
  } catch (err) {
    res.sendStatus(500).json({ 
      message: err.message
    })
  }
}

const addDevice = async (req, res) => {

  const { device } = req.body
  console.log('device>>>',device)

  try {

    const devicesList = await Device.findAll()

    const names = devicesList.map(el => el.name)

          if (names.includes(device)) {
            res.send({ error: 'This name already exists' })
          } else {
            
            let newDevice = new Device({
              name: device,
              status: false,
              warning: false,
              isBeingEdited: false
            })  
            
            await newDevice.save() 
            res.status(201).json(newDevice)
        }
  } catch (err) {
    res.sendStatus(500).json({ 
      message: err.message
    })
  }
}

const getDevicesList = async (req, res) => {

  try {
    const devicesList = await Device.findAll()
    res.status(200).json(devicesList)
  } catch (err) {
    res.sendStatus(500).json({ 
      message: err.message
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
