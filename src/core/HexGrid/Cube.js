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
    var q = this.x
    var r = this.z
    return new Axial(q, r)
  }

  round() {
    var rx = Math.round(this.x)
    var ry = Math.round(this.y)
    var rz = Math.round(this.z)

    var x_diff = Math.abs(rx - this.x)
    var y_diff = Math.abs(ry - this.y)
    var z_diff = Math.abs(rz - this.z)

    if (x_diff > y_diff && x_diff > z_diff) {
      rx = -ry-rz
    } else if (y_diff > z_diff) {
      ry = -rx-rz
    } else {
      rz = -rx-ry
    }

    return new Cube(rx, ry, rz)
  }

  static fromHash(hash) {
    const split = hash.split('.')
    const x = Number(split[0])
    const y = Number(split[1])
    const z = Number(split[2])
    return new Cube(x, y, z)
  }

  hash() {
    return `${this.x}.${this.y}.${this.z}`
  }
}

const CUBE_DIRECTIONS = [
  new Cube(1, 0, -1), new Cube(1, -1, 0), new Cube(0, -1, 1),
  new Cube(-1, 0, 1), new Cube(-1, 1, 0), new Cube(0, 1, -1)
]
