export const getDevices = async () => {
    try {
        const response = await fetch('/devices', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result =  await response.json()
        if (response.status >= 400) {
            throw new Error(result.error || 'Error')
        } else {
            return {
                result: 'Successfully',
                data: result
            }
        }
        
      } catch (e) {
        return {
            result: 'Error',
            error: e.message || 'Something went wrong'
        }
      }
}

export const addDevice = async (device) => {
    try {
        const response = await fetch('/devices', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ device }),
          })
          const result =  await response.json()
          if (response.status >= 400) {
              throw new Error(result.error || 'Error')
          } else {
              return {
                  result: 'Successfully'
              }
          }
    } catch (e) {
        return {
            result: 'Error',
            error: e.message || 'Something went wrong'
        }
    }
}

export const deleteDevice = async (id) => {
    try {
        const response = await fetch(`/devices`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
              body: JSON.stringify({ id }),
            })
            const result =  await response.json()
            if (response.status >= 400) {
                throw new Error(result.error || 'Error')
            } else {
                return {
                    result: 'Successfully'
                }
            }
    } catch (e){
        return {
            result: 'Error',
            error: e.message || 'Something went wrong'
        }
    }
}

export const changePower = async (id, powerStatus) => {
    try {
        const response = await fetch('/devices/status', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, powerStatus })
        })
        const result =  await response.json()
        if (response.status >= 400) {
            throw new Error(result.error || 'Error')
        } else {
            return {
                result: 'Successfully'
            }
        }
    } catch (e) {
        return {
            result: 'Error',
            error: e.message || 'Something went wrong'
        }
    }
}

export const changeWarningStatus = async (id, warningStatus) => {
    try {
        const response = await fetch('/devices/warning', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, warningStatus })
        })
        const result =  await response.json()
        if (response.status >= 400) {
            throw new Error(result.error || 'Error')
        } else {
            return {
                result: 'Successfully'
            }
        }
    } catch (e) {
        return {
            result: 'Error',
            error: e.message || 'Something went wrong'
        }
    }
}

export const editStatus = async (id, status) => {
    try {
        const response = await fetch(`/devices/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
              body: JSON.stringify({ id, status })
            })
            const result = await response.json()
            if (response.status >= 400) {
                throw new Error(result.error || 'Error')
            } else {
                return {
                    result: 'Successfully'
                }
            }
    } catch (e) {
        return {
            result: 'Error',
            error: e.message || 'Something went wrong'
        }
    }
}

export const updateDevice = async (id, name) => {
    try {
        const response = await fetch(`/devices/update`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
              body: JSON.stringify({ id, name })
            })
            const result =  await response.json()
            if (response.status >= 400) {
                throw new Error(result.error || 'Error')
            } else {
                return {
                    result: 'Successfully'
                }
            }
    } catch (e) {
        return {
            result: 'Error',
            error: e.message || 'Something went wrong'
        }
    }
}