import { GameObject, Components } from 'game_engine'

import ex1 from '../assets/explosion/ex_1'
import ex2 from '../assets/explosion/ex_2'
import ex3 from '../assets/explosion/ex_3'

const { Transform, Sprite, Box } = Components

export default class Explosion extends GameObject {
  constructor ({ x, y }) {
    super({ tag: 'explosion' })

    this.addComponent(Transform, { x, y })
    //this.addComponent(Box, { oX: 0.5, oY: 0.5, w: 80, h: 80 })
    this.addComponent(Sprite, {
      frames: [ex1.image, ex2.image, ex3.image],
      fps: 10,
      startIndex: Math.round(Math.random() * 2)
    })
  }
}
