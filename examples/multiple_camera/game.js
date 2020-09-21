import { GameObject, Components } from 'game_engine'

import MainCamera from '../presets/mainCamera'
import FpsCounter from '../presets/fpsCounter'
import Scene from './scene'

const { Transform } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.spawn(FpsCounter, { index: 1 })

    const cW = 300 // camera width
    const cH = 200 // camera height

    const scene = this.spawn(Scene)

    const cams = this.spawn(GameObject, { tag: 'cameras' })
    cams.addComponent(Transform)

    if (this.isClient) {
      // TopLeft
      cams.spawn(MainCamera, { viewX: 0, viewY: 0, x: 0, y: 0, w: cW, h: cH, tag: 'c1', gameObjectToRender: scene })
      // TopRight
      cams.spawn(MainCamera, { viewX: 100, viewY: 0, x: 0, y: cH, w: cW, h: cH, tag: 'c2', gameObjectToRender: scene })
      // BottomLeft
      cams.spawn(MainCamera, { viewX: 50, viewY: 25, x: cW, y: 0, w: cW, h: cH, tag: 'c3', gameObjectToRender: scene })
      // BottomRight
      cams.spawn(MainCamera, { viewX: 25, viewY: 75, x: cW, y: cH, w: cW, h: cH, tag: 'c4', gameObjectToRender: scene })
    }
  }
}
