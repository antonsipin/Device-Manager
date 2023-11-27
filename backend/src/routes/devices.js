const express = require('express')
const router = express.Router()
const deviceController = require('../controllers/device-controller')

router
  .route('/')
  .get(deviceController.getDevicesList)
  .post(deviceController.addDevice)
  .delete(deviceController.deleteDevice)

router
  .route('/status')
  .put(deviceController.changeStatus)
  
router
  .route('/warning')  
  .put(deviceController.setDeviceWarning)

router
  .route('/update')  
  .put(deviceController.isBeingEdited)
  .post(deviceController.updateDevice)

module.exports = router
  