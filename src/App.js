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
    const renderer = autoDetectRenderer(WIDTH, HEIGHT)
    this.refs.stage.appendChild(renderer.view)
    
    const rectangle = new Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 64, 64);
    rectangle.endFill();
    rectangle.x = 10;
    rectangle.y = 10;
    stage.addChild(rectangle)

    let mod = 1

    const update = () => {
      rectangle.x += 1 * mod
      if (rectangle.x >= WIDTH - 64 || rectangle.x <= 0) {
        mod *= -1
      }
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