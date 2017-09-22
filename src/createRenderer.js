import {autoDetectRenderer} from 'pixi.js'

export default function createRenderer() {
  return autoDetectRenderer(256, 256)
}