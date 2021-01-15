import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {
  thunkAddDevice,
  thunkGetDevicesList,
  thunkChangeDeviceStatus,
  thunkDeleteDevice,
  thunkUpdateDevice,
  thunkSetDeviceWarning,
  thunkIsBeingEdited,
  thunkChangeErrorAC
} from '../store/actions'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'

function DeviceMaster() {
  const [value, setValue] = useState(false)
  const [input, setInput] = useState('')
  const [inputDevice, setInputDevice] = useState('')
  const dispatch = useDispatch()
  const devicesList = useSelector((store) => store.devices)
  const error = useSelector((store) => store.error)
  
  useEffect(() => {
    dispatch(thunkGetDevicesList())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  function saveNewDevice() {
    dispatch(thunkAddDevice(input))
    setValue(false)
    setInput('')
  }

  function updateDeviceName(id, name, isBeingEdited) {
    dispatch(thunkUpdateDevice(id, name))
    dispatch(thunkIsBeingEdited(id, isBeingEdited))
    setInputDevice('')
  }

  function changeStatus(id, status, warning) {
    dispatch(thunkChangeDeviceStatus(id, status))
    if (warning === true) {
      dispatch(thunkSetDeviceWarning(id, warning))
    }
  }

  function deleteDevice(id) {
    dispatch(thunkDeleteDevice(id))
  }

  function setDeviceWarning(id, warning) {
    dispatch(thunkSetDeviceWarning(id, warning))
  }

  function changeEditStatus(id, isBeingEdited) {
    dispatch(thunkIsBeingEdited(id, isBeingEdited))
  }

  function changeErrorStatus() {
    setValue(true)
    dispatch(thunkChangeErrorAC())
  }

  return (
    <Container style={divStyle}>
      <h2>
        Device Manager
      </h2>
      <Button onClick={() => changeErrorStatus()} variant="primary" type="submit">
        Add Device
      </Button>
      <Container style={divStyle}> <br />
      
      {value === true ?
        <InputGroup className="mb-3" >
        <FormControl 
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter new device name"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
        <Button onClick={() => saveNewDevice(input)} variant="primary">Save new device</Button>
        </InputGroup.Append>
        </InputGroup> :
        ''
        }
        {error === true ?
          <h4 style={textStyle}>This device already exists</h4> :
          ''
        }
        <br />
      </Container>
      {devicesList.length > 0 && devicesList.map((el, index) => {
        return (
          el.status === true ?
        <Container key={index} style={divStyle}>
        <Card key={index} style={{ backgroundColor: 'red', width: '18.5rem' }}>
        <Card.Body>
        <Card.Title>This is {el.name}</Card.Title>
        {el.warning === true ?
        <Card.Text>Please turn off the {el.name} before update
        </Card.Text> :
        <Card.Text>
        </Card.Text>
        }          
        <Button onClick={() => changeStatus(el.id, el.status, el.warning)} variant="primary">Turn Off</Button>{' '}
        <Button onClick={() => deleteDevice(el.id)} variant="primary">Delete</Button>{' '}
        <Button onClick={() => setDeviceWarning(el.id, el.warning)} variant="primary">Update</Button>
        </Card.Body>
        </Card> <br />
        </Container>      
         :
        <Container key={index} style={divStyle}>
        <Card key={index} style={{ backgroundColor: 'grey', width: '18.5rem' }}>
        <Card.Body>
        <Card.Title>This is {el.name}</Card.Title>
        <Card.Text>
        </Card.Text>
        <Button onClick={() => changeStatus(el.id, el.status, el.warning)} variant="primary">Turn On</Button>{' '}
        <Button onClick={() => deleteDevice(el.id)} variant="primary">Delete</Button>{' '}
        <Button onClick={() => changeEditStatus(el.id, el.isBeingEdited)} variant="primary">Update</Button>
        </Card.Body>
        </Card> <br />
          
        {el.isBeingEdited === true ?
        <InputGroup className="mb-3" >
        <FormControl 
          onChange={(event) => setInputDevice(event.target.value)}
          placeholder="Enter new device name"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button onClick={() => updateDeviceName(el.id, inputDevice, el.isBeingEdited)} variant="primary">Save changes</Button>
        </InputGroup.Append>
        </InputGroup> :
        ''
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
};

const textStyle = {
  color: 'red'
}
