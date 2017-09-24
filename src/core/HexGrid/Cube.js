import assert from './assert'
import Axial from './Axial'

export default class Cube {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
  static direction(n /* 0 to 5 */) {
    assert(0 <= n && n < 6)
    return CUBE_DIRECTIONS[n]
  }
  add(b) {
    return new Cube(
      this.x + b.x,
      this.y + b.y,
      this.z + b.z
    )
  }
  subtract(b) {
    return new Cube(
      this.x - b.x,
      this.y - b.y,
      this.z - b.z
    )
  }
  multi(b) {
    const a = this
    return new Cube(
      a.x * b.x,
      a.y * b.y,
      a.z * b.z
    )
  }
  scale(n) {
    return new Cube(
      this.x * n,
      this.y * n,
      this.z * n
    )
  }

  length() {
    return (Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2
  }

  distanceTo(cube) {
    const a = this
    const b = cube
    return a.subtract(b).length()
  }

  neighboor(direction) {
    return this.add(Cube.direction(direction))
  }

  toAxial() {
    return new Axial(this.x, this.y)
  }
}

const CUBE_DIRECTIONS = [
  new Cube(1, 0, -1), new Cube(1, -1, 0), new Cube(0, -1, 1),
  new Cube(-1, 0, 1), new Cube(-1, 1, 0), new Cube(0, 1, -1)
]
