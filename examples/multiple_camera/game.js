import { GameObject, Components } from 'game_engine'

import MainCamera from '../presets/mainCamera'
import FpsCounter from '../presets/fpsCounter'
import Scene1 from './scene1'

const { Editor } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.addComponent(Editor)
    this.spawn(FpsCounter, { index: 1, render: 'self' })

    const cW = 300 // camera width
    const cH = 200 // camera height

    const scene1 = this.spawn(Scene1)

    if (this.isClient) {
      // TopLeft
      this.spawn(MainCamera, { x: 0, y: 0, vx: 0, vy: 0, vw: cW, vh: cH, tag: 'c1', render: scene1 })
      // TopRight
      this.spawn(MainCamera, { x: 100, y: 0, vx: 0, vy: cH, vw: cW, vh: cH, tag: 'c2', render: scene1 })
      // BottomLeft
      this.spawn(MainCamera, { x: 50, y: 25, vx: cW, vy: 0, vw: cW, vh: cH, tag: 'c3', render: scene1 })
      // BottomRight
      this.spawn(MainCamera, { x: 25, y: 75, vx: cW, vy: cH, vw: cW, vh: cH, tag: 'c4', render: scene1 })
    }
  }
}
