function createMatrix(maxX, maxY) {
  return new Array(maxY)
    .fill(null)
    .map(row => new Array(maxX).fill(0))
}

/*
function cube_spiral(center, radius):
    var results = [center]
    for each 1 ≤ k ≤ radius:
        results = results + cube_ring(center, k)
    return results

function cube_ring(center, radius):
    var results = []
    # this code doesn't work for radius == 0; can you see why?
    var cube = cube_add(center, 
                        cube_scale(cube_direction(4), radius))
    for each 0 ≤ i < 6:
        for each 0 ≤ j < radius:
            results.append(cube)
            cube = cube_neighbor(cube, i)
    return results
*/

function assert(expr) {
  if (!expr) throw new Error('assertion failed')
}

const CUBE_DIRECTIONS = [
  new Cube(1, 0, -1), new Cube(1, -1, 0), new Cube(0, -1, 1),
  new Cube(-1, 0, 1), new Cube(-1, 1, 0), new Cube(0, 1, -1)
]

class Cube {
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
  static direction(n /* 0 to 5 */) {
    assert(0 <= n && n < 6)
    return CUBE_DIRECTIONS[n]
  }
  add(a, b) {
    return new Cube(
      a.x + b.x,
      a.y + b.y,
      a.z + b.z
    )
  }
  subtract(a, b) {
    return new Cube(
      a.x - b.x,
      a.y - b.y,
      a.z - b.z
    )
  }
  subtract(b) {
    const a = this
    return new Cube(
      a.x * b.x,
      a.y * b.y,
      a.z * b.z
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
}

class CubeGrid() {
  constructor(max) {
    this.storage = 
  }
  add(cube) {

  }
  neighboor(cube, direction) {

  }
  scale() {

  }
  addRing(center, radius) {
    const results
    const cube = cube


    return results
  }

  addSpiral(center, radius) {

  }
}

function drawSpiral(center) {

}



/*
function cube_spiral(center, radius):
    var results = [center]
    for each 1 ≤ k ≤ radius:
        results = results + cube_ring(center, k)
    return results

function cube_to_axial(cube):
    var q = cube.x
    var r = cube.z
    return Hex(q, r)

function axial_to_cube(hex):
    var x = hex.q
    var z = hex.r
    var y = -x-z
    return Cube(x, y, z)

axial to pixel


function hex_to_pixel(hex):
    x = size * sqrt(3) * (hex.q + hex.r/2)
    y = size * 3/2 * hex.r
    return Point(x, y)
*/

/*
pixel => axial

function pixel_to_hex(x, y):
    q = x * 2/3 / size
    r = (-x / 3 + sqrt(3)/3 * y) / size
    return hex_round(Hex(q, r))

ROUNDING COORDIANATES

function cube_round(cube):
    var rx = round(cube.x)
    var ry = round(cube.y)
    var rz = round(cube.z)

    var x_diff = abs(rx - cube.x)
    var y_diff = abs(ry - cube.y)
    var z_diff = abs(rz - cube.z)

    if x_diff > y_diff and x_diff > z_diff:
        rx = -ry-rz
    else if y_diff > z_diff:
        ry = -rx-rz
    else:
        rz = -rx-ry

    return Cube(rx, ry, rz)

function hex_round(hex):
    return cube_to_axial(cube_round(axial_to_cube(hex)))
