import { ADD_DEVICE, ADD_DEVICESLIST, ADD_ERROR, CHANGE_ERROR } from './types'

const initialState = { devices: [], error: false}

export const reducers = (state = initialState, action) => {
  switch (action.type) {

    case ADD_DEVICE:
      return { devices: [...state.devices, action.payload], error: false }
    
    case ADD_DEVICESLIST:
      return { devices: action.payload, error: false }
    
    case ADD_ERROR:
      return { devices: [...state.devices], error: true }
    
    case CHANGE_ERROR:
      return {devices: [...state.devices], error: false}
    
    default:
      return state
  }
}
