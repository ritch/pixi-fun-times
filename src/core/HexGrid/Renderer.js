import Point from './Point'
import {Graphics} from 'pixi.js'

export default class Renderer {
  constructor(cubeGrid, hexSize) {
    this.cubeGrid = cubeGrid
    this.hexSize = hexSize;
  }

  axialToPixel(axial) {
    let x = this.hexSize * 3 / 2 * axial.r
    let y = this.hexSize * Math.sqrt(3) * (axial.q + axial.r / 2)
    
    return new Point(x, y)
  }

  drawHex(cube, hex) {
    const center = this.axialToPixel(cube.toAxial())
    const size = this.hexSize

    hex.beginFill(0xFFFFFF)
    hex.lineStyle(1, 0xE8E8E8, 1)
    const numSides = 6
    const points = []

    for (let i = 0; i <= numSides; i++) {
      const point = getHexPoint(center, size, i)
      points.push(point.x, point.y)
    }
  
    hex.drawPolygon(points)
    hex.endFill()
  }

  setup(app) {
    const gfx = this.gfx =  new Graphics()
    app.stage.addChild(gfx)

  
  }

  update() {
    const gfx = this.gfx
    
    gfx.clear()

    for (let cube of this.cubeGrid.storage) {

      this.drawHex(cube, gfx)
    }
  }
}

function createHex(point, size) {
  
}

function getHexPoint({x, y}, size, n) {
  const oneHexSliceRad = 2 * Math.PI / 6
  const px = x + size * Math.cos(n * oneHexSliceRad)
  const py = y + size * Math.sin(n * oneHexSliceRad)
  return new Point(px, py)
}
