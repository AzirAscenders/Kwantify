import React from 'react'

import {NavBar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <NavBar />
      {/* <div id="main"> */}
      <Routes />
      {/* </div> */}
    </div>
  )
}

export default App
