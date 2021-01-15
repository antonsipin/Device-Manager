import './App.css'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/index'
import DevicesList from './components/DevicesList'

function App() {
  return (
    <Provider store={store}>
      <DevicesList />
    </Provider>
  );
}

export default App;
