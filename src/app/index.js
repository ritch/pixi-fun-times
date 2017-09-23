import React, {Component} from 'react'
import {Stage} from 'Base/core'
import {
  Graphics
} from 'pixi.js'
import Grid from './Grid'

export default class MyApp extends Component {
  render() {
    return <div>
      <Stage
        height={window.innerHeight}
        width={window.innerWidth}
        update={update}
        setup={setup}
      />
    </div>
  }
}

const grid = new Grid()
function setup(app) {
  grid.setup(app)
}

function update(delta, count) {
  grid.update(delta, count)
}
