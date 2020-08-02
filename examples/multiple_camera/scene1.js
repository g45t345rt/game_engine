import { GameObject } from 'game_engine'
import Player from './player'

export default class Scene1 extends GameObject {
  constructor () {
    super({ tag: 'scene1' })

    this.spawn(Player, { x: 50, y: 50 })
  }
}
