import Cube from './Cube'

export default class Axial {
  constructor(q, r) {
    this.q = q
    this.r = r
  }
  round() {
    return this
      .toCube()
      .round()
      .toAxial()
  }
  toCube() {
    const x = this.q
    const z = this.r
    const y = -x-z
    return new Cube(x, y, z)
  }
}