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
        backgroundColor={0x393d44}
      />
    </div>
  }
}

function toggleSelected(meta) {
  if (meta.selected) {
    meta.fill = style.fill
    meta.selected = false
  } else {
    meta.fill = 0x37435b
    meta.selected = true
  }
}


const HEX_SIZE = 10
const grid = new CubeGrid({
  onSelect(meta, cube, id) {
    const cubes = CubeGrid.buildRing(cube, 2)
    for (let cube of cubes) {
      const id = grid.get(cube)
      if (id) {
        const meta = grid.getMeta(id)
        if (meta) {
          toggleSelected(meta)
        }
      }
    }
  },
  onMouseEnter(meta) {
    if (meta.selected) return
    meta.fill = 0x5d6c87
  },
  onMouseOut(meta) {
    if (meta.selected) return
    meta.fill = style.fill
  }
})
const center = new Cube(0, 0, 0)
const radius = 20

const style = {
  fill: 0xeaf2ff,
  line: 0xa1b1cc
}

grid.add(style, center)

for (let i = 1; i <= radius; i++) {
  const ring = CubeGrid.buildRing(center, i)
  grid.add(style, ...ring)
}

// grid.add(center)
const offset = {x: window.innerWidth / 2, y: window.innerHeight / 2}
const renderer = new Renderer(grid, HEX_SIZE, offset)

function setup(app) {
  renderer.setup(app)
}

function update(delta, count) {
  renderer.update(delta, count)
}
