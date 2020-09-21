import { GameObject, Components } from 'game_engine'

import FpsCounter from '../presets/fpsCounter'
import Boat from './boat/boat'
const { Grid, Transform } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    //this.addComponent(Transform)
    this.addComponent(Grid, { width: 500, height: 500 })
    this.spawn(FpsCounter, { index: 1 })
    this.spawn(Boat, { x: 100, y: 100 })
  }
}
