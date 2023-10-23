import { ADD_DEVICE, ADD_DEVICESLIST, SET_ERROR, UPDATE_DEVICE, CHANGE_POWER, DELETE_DEVICE, CHANGE_EDIT_STATUS, SET_WARNING } from './types'
import * as api from '../api'

export const addDeviceAC = (device) => ({ type: ADD_DEVICE, payload: device })
export const addDevicesListAC = (devicesList) => ({ type: ADD_DEVICESLIST, payload: devicesList })
export const changePowerAC = (id, powerStatus) => ( { type: CHANGE_POWER, payload: { id, powerStatus } })
export const setErrorAC = (error) => ({ type: SET_ERROR , payload: error })
export const setWarningAC = (id, warningStatus) => ({ type: SET_WARNING , payload: { id, warning: warningStatus} })
export const deleteDeviceAC = (id) => ({ type: DELETE_DEVICE, payload: id })
export const changeEditStatusAC = (id, status) => ({ type: CHANGE_EDIT_STATUS, payload: { id, status } })
export const updateDeviceAC = (id, name) => ({ type: UPDATE_DEVICE, payload: { id, name } })

export const thunkChangeEditStatus = (id, status) => async (dispatch) => {
  if (id) {
    try {
      api.editStatus(id, status).then((response) => {
        if (response && response.error) {
          dispatch(setErrorAC(response.error))
        } else {
          dispatch(changeEditStatusAC(id, status))
        }
      })
      } catch (e) {
        dispatch(setErrorAC(e.message || 'Something went wrong'))
    }
  }
}

export const thunkChangeWarningStatus = (id, warningStatus) => async (dispatch) => {
  if (id) {
    try {
      api.changeWarningStatus(id, warningStatus).then((response) => {
        if (response && response.error) {
          dispatch(setErrorAC(response.error))
        } else {
          dispatch(setWarningAC(id, warningStatus))
        }
      })
      } catch (e) {
        dispatch(setErrorAC(e.message || 'Something went wrong'))
    }
  }
}

export const thunkUpdateDevice = (id, name) => async (dispatch) => {
  if (name) {
    try {
      api.updateDevice(id, name).then((response) => {
        if (response && response.error) {
          dispatch(setErrorAC(response.error))
        } else {
          dispatch(updateDeviceAC(id, name))
          dispatch(setErrorAC(''))
          dispatch(changeEditStatusAC(id, false))
        }
      })
    } catch (e) {
      dispatch(setErrorAC(e.message || 'Something went wrong'))
    }
  } else {
    dispatch(setErrorAC('Can not add empty name'))
  }
}

export const thunkDeleteDevice = (id) => async (dispatch) => {
  if (id) {
    try {
      api.deleteDevice(id).then((response) => {
        if (response && response.result === 'Successfully') {
          dispatch(deleteDeviceAC(id))
        } else {
          dispatch(setErrorAC('Something went wrong'))
        }
      })
    } catch (e) {
      dispatch(setErrorAC(e.message || 'Something went wrong'))
    }
  }
}

export const thunkChangeDevicePower = (id, powerStatus) => async (dispatch) => {
  if (id) {
    try {
      api.changePower(id, powerStatus).then((response) => {
        if (response && response.error) {
          dispatch(setErrorAC(response.error || 'Something went wrong'))
        } else {
          dispatch(changePowerAC(id, powerStatus))
          dispatch(setWarningAC(false))
          dispatch(changeEditStatusAC(id, false))
        }
      })
    } catch (e) {
      dispatch(setErrorAC(e.message || 'Something went wrong'))
    }
  }
}

export const thunkGetDevicesList = () => async (dispatch) => {
  try {
    api.getDevices().then((response) => {
      if (response && response.result === 'Successfully') {
        const devices = response.data
        if (devices.length > 0) {
          dispatch(addDevicesListAC(devices))
          }
      } else {
        if (response.error) {
          dispatch(setErrorAC(response.error))
        }
      }
    })
    
  } catch (e) {
    dispatch(setErrorAC(e.message || 'Something went wrong'))
  }
}

export const thunkAddDevice = (device) => async (dispatch) => {
  if (device) {
    try {
      api.addDevice(device).then((response) => {
        if (response && response.error) {
          dispatch(setErrorAC(response.error))
        } else {
          dispatch(addDeviceAC({
            name: device,
            status: false,
            warning: false,
            isBeingEdited: false
          }))
        }
      })
      
    } catch (e) {
      dispatch(setErrorAC(e.message || 'Something went wrong'))
    }
  } else {
    dispatch(setErrorAC('Can not add empty name'))
  }
} 
