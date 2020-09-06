import { GameObject, Components } from 'game_engine'
import FpsCounter from '../presets/fpsCounter'

import Scene from './scene'

const { Editor } = Components

export default class Game extends GameObject {
  constructor () {
    super({ id: 'game' })

    this.addComponent(Editor)
    this.spawn(FpsCounter, { index: 1 })
    this.spawn(Scene, { objCount: 200 })
  }
}
