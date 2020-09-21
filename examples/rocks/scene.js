import { GameObject, Components } from 'game_engine'
import Rock from './rock'

const { Box, Transform } = Components
const rand = (max) => Math.floor(Math.random() * max)

export default class Scene extends GameObject {
  constructor ({ objCount }) {
    super({ tag: 'scene' })

    //this.explicitRender = true

    //this.addComponent(Transform, { x: 0, y: 0 })
    //const box = this.addComponent(Box, { w: 500, h: 500 })
    //box.draw = false

    for (let i = 0; i < objCount; i++) {
      const x = rand(300)
      const y = rand(300)

      this.spawn(Rock, { x, y })
    }
  }

  spawnRock () {
    this.spawn(Rock, { x: rand(300), y: rand(300) })
  }

  destroyRock () {
    const rocks = this.findGameObjects((go) => go instanceof Rock)
    if (rocks.length > 0) rocks[0].destroy()
  }
}
