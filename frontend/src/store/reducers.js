import { ADD_DEVICE, ADD_DEVICESLIST, SET_ERROR, UPDATE_DEVICE, CHANGE_POWER, DELETE_DEVICE, CHANGE_EDIT_STATUS, SET_WARNING } from './types'

const initialState = { devices: [], error: ''}

export const reducers = (state = initialState, action) => {
  switch (action.type) {

    case ADD_DEVICE:
      return { 
        ...state,
        devices: [...state.devices, action.payload].sort((a, b) => a.name.localeCompare(b.name)), 
        error: '' 
      }
    
    case ADD_DEVICESLIST:
      const deviceList = action.payload
      return { 
        ...state,
        devices: deviceList.sort((a, b) => a.name.localeCompare(b.name)), 
        error: '' 
      }

    case DELETE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter((device) => device.id !== action.payload),
        error: ''
      }
      
    case CHANGE_EDIT_STATUS:
      return {
        ...state,
        devices: state.devices.map((device) => {
          if (device.id === action.payload.id) {
            device.isBeingEdited = action.payload.status
          }
          return device
        }),
        error: ''
      }  

    case UPDATE_DEVICE:
      let updatedDevices
      if (action.payload.id && action.payload.name) {
        updatedDevices = state.devices.map((device) => {
          if (device.id === action.payload.id) {
            device.name = action.payload.name
          } 
          return device
        })
      }
      
      return { 
        ...state,
        devices: updatedDevices || state.devices, 
        error: '' 
      }

    case CHANGE_POWER:
      let devices
      if (action.payload.id) {
        devices = state.devices.map((device) => {
          if (device.id === action.payload.id) {
            device.status = action.payload.powerStatus
            device.warning = false
          }
          return device
        })
      }
      
      return { 
        ...state,
        devices: devices || state.devices,
        error: '' 
      }
    
    case SET_ERROR:
      return { 
        ...state,
        error: action.payload 
      }

    case SET_WARNING:
      return { 
        ...state,
        devices: state.devices.map((device) => {
          if (device.id === action.payload.id) {
            device.warning = action.payload.warning
          }
          return device
        }),
        error: ''
      }
    
    default:
      return state
  }
}
