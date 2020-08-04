import { GameObject, Components } from 'game_engine'
import Boat from './boat'

const { FpsCounter, Editor } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.addComponent(Editor)
    this.addComponent(FpsCounter)
    this.spawn(Boat)
  }
}
