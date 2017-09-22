require("react-hot-loader/patch")

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from '../app/index'

let render = (App) => {
  ReactDOM.render(
    <AppContainer errorReporter={bypassRedbox}>
      <App />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../app/index.js', (App) => {
    render(App)
  })
}

function bypassRedbox ({error}) {
  if (error) throw error
}
