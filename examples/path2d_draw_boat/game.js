import { GameObject, Components } from 'game_engine'

import Boat from './boat'
import FpsCounter from '../presets/fpsCounter'

const { Editor } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.addComponent(Editor)

    this.renderPointer = this
    this.spawn(FpsCounter, { index: 1 })
    this.spawn(Boat)
  }
}
