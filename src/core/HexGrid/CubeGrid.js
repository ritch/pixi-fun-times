import Cube from './Cube'
import assert from './assert'

export default class CubeGrid {
  constructor() {
    this.storage = []
  }
  add(...cube) {
    // TODO(matt) optimiz3
    this.storage.push(...cube)
  }
  remove(cube) {
    throw new Error('oops this aint here yet')
  }

  static buildRing(center, radius) {
    assert(radius > 0)

    const results = []

    let cube = center.add(
      Cube.direction(4).scale(radius)
    )

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < radius; j++) {
        results.push(cube)
        cube = cube.neighboor(i)
      }
    }

    return results
  }

  addSpiral(center, radius) {

  }
}