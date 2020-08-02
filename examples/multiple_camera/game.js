import { GameObject, Components } from 'game_engine'

import MyCamera from './mycamera'
import Scene1 from './scene1'

const { Editor, FpsCounter } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.addComponent(Editor)
    this.addComponent(FpsCounter)

    const cW = 300 // camera width
    const cH = 200 // camera height

    const scene1 = this.spawn(Scene1)
    scene1.canRender = false

    if (this.isClient) {
      // TopLeft
      this.spawn(MyCamera, { x: 0, y: 0, vx: 0, vy: 0, vw: cW, vh: cH, tag: 'c1', ref: scene1 })
      // TopRight
      this.spawn(MyCamera, { x: 100, y: 0, vx: 0, vy: cH, vw: cW, vh: cH, tag: 'c2', ref: scene1 })
      // BottomLeft
      this.spawn(MyCamera, { x: 50, y: 25, vx: cW, vy: 0, vw: cW, vh: cH, tag: 'c3', ref: scene1 })
      // BottomRight
      this.spawn(MyCamera, { x: 25, y: 75, vx: cW, vy: cH, vw: cW, vh: cH, tag: 'c4', ref: scene1 })
    }
  }
}
