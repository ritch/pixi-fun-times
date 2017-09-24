
```
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

- - 
pixel => axial
- - 
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
```