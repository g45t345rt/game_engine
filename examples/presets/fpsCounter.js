import { GameObject, Components } from 'game_engine'

const { DrawFps, Transform } = Components

export default class FpsCounter extends GameObject {
  static clientOnly = true

  constructor (args) {
    super({ id: 'fpsCounter', ...args })

    this.addComponent(Transform, { x: 10, y: 10 })
    this.addComponent(DrawFps)
  }
}
