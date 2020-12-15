import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Loader from 'react-loader-spinner'

export default function Loading(props) {
  return (
    <div className="centered-container">
      <Loader type="Grid" color="#57bc90" height="10em" width="10em" />
    </div>
  )
}
