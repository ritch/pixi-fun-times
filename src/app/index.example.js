import React, {Component} from 'react'
import {Stage} from 'Base/core'
import {
  Graphics
} from 'pixi.js'

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

const square = new Graphics()

function setup(app) {
  square.x = 200
  square.y = 200
  square.beginFill(0xFFFFFF)
  square.drawRect(0, 0, 100, 100)
  square.endFill()
  app.stage.addChild(square)
}

function update(delta, count) {
  square.rotation += 0.1 * delta
  square.x += 0.5 * delta
}