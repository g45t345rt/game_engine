import { GameObject } from 'game_engine'
import Player from './player'
import FpsCounter from '../presets/fpsCounter'

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })
    this.spawn(FpsCounter)
    this.spawn(Player)
  }
}
