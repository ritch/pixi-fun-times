import Cube from './Cube'
import assert from './assert'
import createMatrix from './createMatrix'

export default class CubeGrid {
  constructor({onSelect, onMouseOver, onMouseEnter, onMouseOut}) {
    this.onSelect = onSelect
    this.onMouseOver = onMouseOver
    this.onMouseEnter = onMouseEnter
    this.onMouseOut = onMouseOut
    this.storage = {}
  }
  add(meta, ...cube) {
    for (let c of cube) {
      this.set(c.hash(), {...meta})
    }
  }
  each(fn) {
    for (let [hash, value] of Object.entries(this.storage)) {
      fn(Cube.fromHash(hash), value)
    }
  }
  get(cube) {
    if (cube) {
      const hash = cube.hash()
      if (hash in this.storage) {
        return hash
      }
    }
  }
  getMeta(hash) {
    if (hash) {
      return this.storage[hash]
    }
  }
  set(hash, value) {
    this.storage[hash] = value
  }
  remove(hash) {
    this.set(hash, null)
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

  handleSelect(cube) {
    if (!this.onSelect) return
    const hash = this.get(cube)

    if (hash) {
      this.onSelect(this.getMeta(hash), cube, hash)
    }
  }
  handleMouseEnter(cube) {
    if (!this.onMouseEnter) return
    const hash = this.get(cube)

    if (hash) {
      this.onMouseEnter(this.getMeta(hash), cube, hash)
    }
  }
  handleMouseOut(cube) {
    if (!this.onMouseOut) return
    const hash = this.get(cube)

    if (hash) {
      this.onMouseOut(this.getMeta(hash), cube, hash)
    }
  }
  handleMouseOver(cube) {
    if (!this.onMouseOver) return
    const hash = this.get(cube)

    if (hash) {
      this.onMouseOver(this.getMeta(hash), cube, hash)
    }
  }
}