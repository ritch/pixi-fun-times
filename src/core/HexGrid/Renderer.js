import Axial from './axial'
import Point from './Point'
import {Graphics} from 'pixi.js'

export default class Renderer {
  constructor(cubeGrid, hexSize, offset) {
    this.cubeGrid = cubeGrid
    this.hexSize = hexSize
    this.offset = offset
  }

  cubeAtPoint(point) {
    return this.pixelToAxial(point).toCube()
  }

  pixelToAxial({x, y}) {
    const hexSize = this.hexSize
    const q = x * 2/3 / hexSize
    const r = (-x / 3 + Math.sqrt(3) / 3 * y) / hexSize
    return (new Axial(q, r)).round()
  }

  axialToPixel(axial) {
    const size = this.hexSize
    const x = size * 3 / 2 * axial.q
    const y = size * Math.sqrt(3) * (axial.r + axial.q / 2)
    return new Point(x, y)
  }

  drawHex(gfx, cube, meta) {
    const center = this.axialToPixel(cube.toAxial())
    const size = this.hexSize

    gfx.beginFill(meta.fill)
    gfx.lineStyle(1, meta.line, 1)
    const numSides = 6
    const points = []

    for (let i = 0; i <= numSides; i++) {
      const point = getHexPoint(center, size, i)
      points.push(point.x, point.y)
    }
  
    gfx.drawPolygon(points)
    gfx.endFill()
  }

  getPointFromEvent(e) {
    const {x, y} = e.data.global
    const topLeftPoint = new Point(x, y)
    return topLeftPoint.subtract(this.offset)
  }

  setup(app) {
    const gfx = this.gfx =  new Graphics()
    app.stage.addChild(gfx)
    app.stage.x = this.offset.x
    app.stage.y = this.offset.y
    gfx.interactive = true

    gfx.on('click', (e) => {
      const centerPoint = this.getPointFromEvent(e)
      const cube = this.cubeAtPoint(centerPoint)
      if (cube) {
        this.cubeGrid.handleSelect(cube)
      }
    })

    let prevHoveringOver = null

    gfx.on('mousemove', (e) => {
      // TODO - maybe move this to the grid?

      const centerPoint = this.getPointFromEvent(e)
      const currentlyHoveringOver = this.cubeAtPoint(centerPoint)

      if (currentlyHoveringOver !== prevHoveringOver) {
        // changed what we are hovering over
        if (prevHoveringOver) {
          this.cubeGrid.handleMouseOut(prevHoveringOver)
        }
        if (currentlyHoveringOver) {
          this.cubeGrid.handleMouseEnter(currentlyHoveringOver)
        }
        prevHoveringOver = currentlyHoveringOver    
      } else if (currentlyHoveringOver) {
        this.cubeGrid.handleMouseOver(currentlyHoveringOver)
      }
    })
  
  }

  update() {
    const gfx = this.gfx
    
    gfx.clear()

    this.cubeGrid.each((cube, meta) => {
      this.drawHex(gfx, cube, meta)
    })
  }
}

/*
function pixel_to_hex(x, y):
    q = x * 2/3 / size
    r = (-x / 3 + sqrt(3)/3 * y) / size
    return hex_round(Hex(q, r))
*/



function getHexPoint({x, y}, size, n) {
  const oneHexSliceRad = 2 * Math.PI / 6
  const px = x + size * Math.cos(n * oneHexSliceRad)
  const py = y + size * Math.sin(n * oneHexSliceRad)
  return new Point(px, py)
}
