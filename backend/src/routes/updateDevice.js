const express = require('express')
const router = express.Router()
const deviceController = require('../controllers/device-controller')

router
  .route('/')
  .post(deviceController.updateDevice)

module.exports = router
