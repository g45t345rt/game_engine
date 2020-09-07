import { GameObject, Components } from 'game_engine'
import Player from './player'
import FpsCounter from '../presets/fpsCounter'

const { Editor } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })
    this.addComponent(Editor)
    this.spawn(FpsCounter)
    this.spawn(Player)
  }
}
