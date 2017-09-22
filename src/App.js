import React, {Component} from 'react'
import Smoothie from 'Base/core/Smoothie'
import {
  Container,
  autoDetectRenderer,
  Graphics,
  hitTestRectangle
} from 'pixi.js'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: 1
    }
  }
  render() {
    return <div>
      <Stage height={window.innerHeight} width={window.innerWidth} />
    </div>
  }
}


class Stage extends Component {
  render() {
    return (
      <div id="pixi" ref="stage" />
    )
  }

  componentDidMount() {
    const HEIGHT = this.props.height
    const WIDTH = this.props.width
    const stage = new Container()
    const renderer = autoDetectRenderer(WIDTH, HEIGHT, {antialias: true})
    this.refs.stage.appendChild(renderer.view)

    const size = 50

    function getAdjCenter(centerX, centerY, size, vertex) {
      const zeroPoint = getHexPoint(centerX, centerY, size, vertex)
      return getHexPoint(zeroPoint[0], zeroPoint[1], size, vertex + 1)
    }

    function createAdjHex(current, size, vertex) {
      const center = getAdjCenter(current[0], current[1], size, vertex)
      return {
        hex: createHex(center[0], center[1], size),
        center
      }
    }

    function petalExists(center, size, allPetals) {
      return allPetals[center.join('x')] === true
    }

    function addPetals(flowerCenter, size, allPetals, floweredPetals) {
      let petals = []
      if (petalExists(flowerCenter, size, floweredPetals)) return []

      floweredPetals[flowerCenter.join('x')] = true
      for (let i = 0; i < 6; i++) {
        let {hex, center} = createAdjHex(flowerCenter, size, i)
        if (petalExists(center, size, allPetals)) continue
        stage.addChild(hex)
        allPetals[center.join('x')] = true
        petals.push(center)
      }
      return petals
    }

    let veryCenter = [WIDTH / 2, HEIGHT / 2]
    stage.addChild(createHex(veryCenter[0], veryCenter[1], size))
    let allPetals = {}
    let floweredPetals = {}
    let petalCount = 0
    let petals = addPetals(veryCenter, size, allPetals, floweredPetals)

    const screenArea = HEIGHT * WIDTH
    const petalArea = Math.pow(size * 2, 2)

    // NOTE: a petal/hex is not a square
    // so this math is way off
    let MAX_PETALS = Math.round(screenArea / petalArea)

    let queue = petals

    while (petalCount <= MAX_PETALS && queue.length) {
      let petal = queue.shift()
      let created = addPetals(petal, size, allPetals, floweredPetals)
      petalCount += created.length
      queue = queue.concat(created)
    }

    const update = () => {

    }

    var smoothie = new Smoothie({
      renderer,
      root: stage,
      fps: 60,
      update,
      interpolate: true
    })

    smoothie.start()
  }
}

function createHex(x, y, size) {
  const hex = new Graphics()
  hex.beginFill(0xFFFFFF)
  hex.lineStyle(4, 0xE8E8E8, 1)
  const numSides = 6
  const points = []

  // x = center of hex
  // y = center

  for (let i = 0; i <= numSides; i++) {
    points.push(getHexPoint(x, y, size, i))
  }

  hex.drawPolygon(pointsToArray(points))
  hex.endFill()

  return hex
}

function getHexPoint(x, y, size, n) {
  const px = x + size * Math.cos(n * 2 * Math.PI / 6)
  const py = y + size * Math.sin(n * 2 * Math.PI / 6)
  return [px, py]
}

function getHexCenter(point, size, n) {
  // given a point on the hex (point)
  // and which point (n)
  const [px, py] = point

  // determine the center of the hexagon
  return getHexPoint(px, py, size, (n + 3) % 6)
}

function pointsToArray(points) {
  const arr = []
  for (let [x, y] of points) {
    arr.push(x)
    arr.push(y)
  }
  return arr
}