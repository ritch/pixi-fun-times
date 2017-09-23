import {
  Graphics
} from 'pixi.js'

export default class Grid {
  constructor() {
    this.size = 25
  }
  createHexGridItem(axial) {
    const points = []
    const hex = new Graphics()

    const { x, y } = axialToPixel(axial, this.size)
    for (let n = 0; n <= 6; n++) {
      const px = x + this.size * Math.cos((Math.PI / 3) + n * 2 * Math.PI / 6) + 500
      const py = y + this.size * Math.sin((Math.PI / 3) + n * 2 * Math.PI / 6) + 500

      points.push(px, py)
    }

    hex.beginFill(0xFFFFFF)
    hex.lineStyle(4, 0xE8E8E8, 1)
    hex.drawPolygon(points)
    hex.endFill()
    return hex
  }

  setup(app) {
    const order = 2
    const hexy = (q, r) => {
      let hex = this.createHexGridItem({ q, r })
      app.stage.addChild(hex)
    }

/*
For hexagon shaped maps of radius N, where N = max(abs(x), abs(y), abs(z), we have first_column[r] == -N - min(0, r). You’d access array[r][q + N + min(0, r)]. However, since we’re starting with some
values of r < 0, we also have to offset the row, and use array[r + N][q + N + min(0, r)].
*/

    const N = 3

    hexy(0, 0)
    hexy(0, 1)
    hexy(0, 2)
    hexy(0, 3)
    
    hexy(-1, 0)
    hexy(-2, 0)
    hexy(-3, 0)
    hexy(1, 0)
    hexy(2, 0)
    hexy(3, 0)

  }
  update() {

  }
}

function cubeToAxial(cube, size) {
  return { q: cube.x, r: cube.z }
}

function axialToPixel(axial, size) {
  const x = size * 3/2 * axial.q
  const y = size * Math.sqrt(3) * (axial.r + axial.q/2)
  return { x, y }
}
