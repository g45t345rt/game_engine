import { GameObject } from 'game_engine'
import Player from './player'

export default class Scene extends GameObject {
  constructor () {
    super({ tag: 'scene', explicitRender: true })

    this.spawn(Player, { x: 50, y: 50 })
  }
}
