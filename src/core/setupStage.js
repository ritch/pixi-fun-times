import Smoothie from 'Base/core/Smoothie'
import {
  Application,
  Container,
  autoDetectRenderer
} from 'pixi.js'


export default function setupStage({width, height, domElement, update, setup, backgroundColor}) {
  const app = new Application(width, height, {antialias: true, backgroundColor})
  let updateCount = 0

  domElement.appendChild(app.view)

  if (setup) {
    setup(app)
  }

  let count = 0
  app.ticker.add(function(delta) {
    update(delta, count)
    count += 0.1
  })
  return stage
}
