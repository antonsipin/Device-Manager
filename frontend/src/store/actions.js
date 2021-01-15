import { ADD_DEVICE, ADD_DEVICESLIST, ADD_ERROR, CHANGE_ERROR } from './types'

export const addDeviceAC = (device) => ({ type: ADD_DEVICE, payload: device })

export const addDevicesListAC = (devicesList) => ({ type: ADD_DEVICESLIST, payload: devicesList })

export const notUniqueErrorAC = () => ({ type: ADD_ERROR })

export const thunkChangeErrorAC = () => ({ type: CHANGE_ERROR})

export const thunkIsBeingEdited = (id, isBeingEdited) => async (dispatch) => {
  
  if (id) {

    try {

    const response = await fetch(`/isBeingEdited`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({ id, isBeingEdited }),
    });
      let data = await response.json()
      dispatch(addDevicesListAC(data))

    } catch (e) {
    console.log(e)
    }
  }
}

export const thunkSetDeviceWarning = (id, warning) => async (dispatch) => {
  
  if (id) {

    try {

    const response = await fetch(`/setDeviceWarning`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({ id, warning }),
    });
      let data = await response.json()
      dispatch(addDevicesListAC(data))

    } catch (e) {
    console.log(e)
    }
  }
}

export const thunkUpdateDevice = (id, name) => async (dispatch) => {
  
  if (id && name) {

    try {

    const response = await fetch(`/updateDevice`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({ id, name }),
    });
      let data = await response.json()
      dispatch(addDevicesListAC(data))

    } catch (e) {
    console.log(e)
    }
  }
}

export const thunkDeleteDevice = (id) => async (dispatch) => {
  
  if (id) {

    try {

    const response = await fetch(`/deleteDevice`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({ id }),
    });
      let data = await response.json()
      dispatch(addDevicesListAC(data))

    } catch (e) {
    console.log(e)
    }
  }
}

export const thunkChangeDeviceStatus = (id, status) => async (dispatch) => {
  if (id) {

    try {

    const response = await fetch(`/changeStatus`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({ id, status }),
    });
      let data = await response.json()
      dispatch(addDevicesListAC(data))

    } catch (e) {
    console.log(e)
    }
  }
}

export const thunkGetDevicesList = () => async (dispatch) => {
  try {

    const response = await fetch('/getDevices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let devicesList = await response.json()
    if (devicesList.length > 0) {
    dispatch(addDevicesListAC(devicesList))
    }
  } catch (e) {
    console.log(e);
  }
}

export const thunkAddDevice = (device) => async (dispatch) => {

  if (device) {
    try {
    
    const response = await fetch(`/addDevice`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({ device }),
    });
      let data = await response.json()

      if (data.error === 'This name already exists') {
        dispatch(notUniqueErrorAC())
      } else {

        dispatch(addDeviceAC(data))
      }
    } catch (e) {
      console.log(e)
    }
  } 
} 
