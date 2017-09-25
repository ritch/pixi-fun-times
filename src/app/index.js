import React, { Component } from 'react'
import { Stage } from 'Base/core'
import {
  Graphics
} from 'pixi.js'

let PF = require('pathfinding');

import { Renderer, CubeGrid, Cube } from 'Base/core/HexGrid'

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

let start = null
let end = null
const HEX_SIZE = 10
const grid = new CubeGrid({
  onSelect(meta, cube, id) {
    let selectedAxial = cube.toAxial()

    //convert pos/neg coords to positive indexable for the pathfinder
    let indexX = selectedAxial.q + 20;
    let indexY = selectedAxial.r + 20;

    if (start == null) {
      meta.fill = 0x00FF00
      start = [indexX, indexY]
    } else if (end == null) {
      meta.fill = 0x0000FF
      end = [indexX, indexY]
      
      var path = finder.findPath(start[0],
        start[1],
        end[0],
        end[1],
        map);

      for (let i = 1; i < path.length - 1; i++) {
        const coord = path[i]
        const x = coord[0] - 20
        const z = coord[1] - 20
        const y = -x - z

        let pathCube = new Cube(x, y, z)

        grid.storage[pathCube.hash()].fill = 0xFF0000
      }
    }
  },
  onMouseEnter(meta) {
    // if (meta.selected) return
    // meta.fill = 0x5d6c87
  },
  onMouseOut(meta) {
    // if (meta.selected) return
    // meta.fill = style.fill
  }
})

let map = new PF.Grid(41, 41);
let finder = new PF.AStarFinder({ allowDiagonal: true });

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
const offset = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
const renderer = new Renderer(grid, HEX_SIZE, offset)

function setup(app) {
  renderer.setup(app)
  //set the map for the pathfinder
  for (let hash in grid.storage) {
    if (Math.random() < .35) {
      var item = grid.storage[hash]
      var newAxial = item.cube.toAxial()

      //convert pos/neg coords to positive indexable for the pathfinder
      let indexX = newAxial.q + 20;
      let indexY = newAxial.r + 20;

      grid.storage[hash].fill = 0x505050
      map.setWalkableAt(indexX, indexY, false);
    }
  }
}

function update(delta, count) {
  renderer.update(delta, count)
}
