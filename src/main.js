import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

let render = InitialCompoennt => {
  ReactDOM.render(
    <AppContainer errorReporter={bypassRedbox}>
      <InitialCompoennt />
    </AppContainer>,
    document.getElementById('root')
  )
}

const App = () => {
  return <div>Hello World</div>
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./', () => {
    render(App)
  })
}

function bypassRedbox ({error}) {
  if (error) throw error
}
