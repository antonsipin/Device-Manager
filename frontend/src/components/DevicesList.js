import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {
  thunkAddDevice,
  thunkGetDevicesList,
  thunkChangeDevicePower,
  thunkDeleteDevice,
  thunkUpdateDevice,
  changeEditStatusAC,
  setErrorAC,
  thunkChangeWarningStatus,
  thunkChangeEditStatus
} from '../store/actions'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'


function DeviceMaster() {
  const [isInputActive, setIsInputActive] = useState(false)
  const [input, setInput] = useState('')
  const [inputDevice, setInputDevice] = useState('')
  const dispatch = useDispatch()
  const devicesList = useSelector((store) => store.devices)
  const error = useSelector((store) => store.error)
  
  useEffect(() => {
    dispatch(thunkGetDevicesList())
  }, [])
  
  function saveNewDevice() {
    dispatch(thunkAddDevice(input))
    setIsInputActive(false)
    setInput('')
  }

  function updateDeviceName(id, name, editStatus) {
    if (name.length) {
      dispatch(thunkUpdateDevice(id, name))
      setInputDevice('')
    } else {
        dispatch(setErrorAC('Can not add empty name'))
    }
  }

  function changePower(id, powerStatus) {
    dispatch(thunkChangeDevicePower(id, !powerStatus))
  }

  function deleteDevice(id) {
    dispatch(thunkDeleteDevice(id))
  }

  function changeEditStatus(id, editStatus, powerStatus, warningStatus) {
    if (powerStatus) {
      dispatch(thunkChangeWarningStatus(id, !warningStatus))
    } else if (!error.length) {
      dispatch(thunkChangeEditStatus(id, !editStatus))
    }
  }

  function handleAddDevice() {
    setIsInputActive(true)
    dispatch(setErrorAC(''))
  }

  return (
    <Container style={divStyle}>
      <h2>
        Device Manager
      </h2>
      <Button onClick={() => handleAddDevice()} variant="primary" type="submit">
        Add Device
      </Button>
      <Container style={divStyle}> <br />
      
      {isInputActive &&
        <InputGroup className="mb-3" >
          <FormControl 
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter new device name"
            aria-describedby="basic-addon2"
          />
          <Button onClick={() => saveNewDevice(input)} variant="primary">Save new device</Button>
        </InputGroup>
      }
        {error &&
          <h4 style={textStyle}>
            { error }
          </h4>
        }
        <br />
      </Container>

      {devicesList.length > 0 && devicesList.map((el, index) => {
        return (
        <Container key={index} style={divStyle}>
          <Card key={index} style={{ backgroundColor: el.status ? 'red' : 'grey', width: '18.5rem' }}>
          <Card.Body>
            <Card.Title>
              This is {el.name}
            </Card.Title>
            {el.warning &&
            <Card.Text>
              Please turn off the {el.name} device before update
            </Card.Text>
            }          
            <Button onClick={() => changePower(el.id, el.status)} variant="primary">
              {el.status ? 'Turn Off' : 'Turn On'}
            </Button>{' '}
            <Button onClick={() => deleteDevice(el.id)} variant="primary">
              Delete
            </Button>{' '}
            <Button onClick={() => changeEditStatus(el.id, el.isBeingEdited, el.status, el.warning)} variant="primary">
              Update
            </Button>
          </Card.Body>
          </Card> <br />
          {el.isBeingEdited &&
          <InputGroup className="mb-3" >
            <FormControl 
              onChange={(event) => setInputDevice(event.target.value)}
              placeholder="Enter new device name"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick={() => updateDeviceName(el.id, inputDevice, el.isBeingEdited)} variant="primary">
                Save changes
              </Button>
            </InputGroup.Append>
          </InputGroup>
          }
        </Container>      
        )
      })}
    </Container>
  )
}

export default DeviceMaster

const divStyle = {
  WebkitTransition: 'all',
  msTransition: 'all',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}

const textStyle = {
  color: 'red'
}
