import React, {Component} from 'react'
import {Stage} from 'Base/core'
import {
  Graphics
} from 'pixi.js'

import {Renderer, CubeGrid, Cube} from 'Base/core/HexGrid'


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


const HEX_SIZE = 50
const grid = new CubeGrid()
const center = new Cube(0, 0, 0)
const radius = 3

grid.add(center)

for (let i = 1; i <= radius; i++) {
  const ring = CubeGrid.buildRing(center, i)
  grid.add(...ring)
}

// grid.add(center)

const renderer = new Renderer(grid, HEX_SIZE)

function setup(app) {
  // TODO fixme
  app.stage.x += window.innerWidth / 2
  app.stage.y += window.innerHeight / 2

  renderer.setup(app)
}

function update(delta, count) {
  renderer.update(delta, count)
}
