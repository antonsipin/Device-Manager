import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import DevicesList from './components/DevicesList'

configure({
  adapter: new Adapter()
})

describe('<App />', () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should render 1 DevicesList component', () => {

    expect(wrapper.find(DevicesList)).toHaveLength(1)
    
  })

})
