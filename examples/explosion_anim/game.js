import { GameObject, Components } from 'game_engine'

const { Editor } = Components
import FpsCounter from '../presets/fpsCounter'
import Explosion from './explosion'

export default class Game extends GameObject {
  constructor () {
    super({ id: 'game' })

    this.addComponent(Editor)
    this.spawn(FpsCounter, { index: 1 })

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 500
      const y = Math.random() * 500
      this.spawn(Explosion, { x, y })
    }

  }
}
