const express = require('express')
const router = express.Router()
const deviceController = require('../controllers/device-controller')

router
  router.get('/', deviceController.getDevicesList);

module.exports = router
