import { GameObject, Components } from 'game_engine'
const { Transform, Box, Keyboard } = Components

export default class Player extends GameObject {
  constructor ({ x, y }) {
    super({ tag: 'player' })

    this.speed = 2
    this.addComponent(Transform, { x, y })
    this.addComponent(Box, { w: 50, h: 50 })
    this.addComponent(Keyboard)
  }

  update () {
    const transform = this.getComponent(Transform)
    const { isKeyDown } = this.getComponent(Keyboard)

    if (isKeyDown('ArrowUp')) transform.y -= this.speed
    if (isKeyDown('ArrowDown')) transform.y += this.speed
    if (isKeyDown('ArrowLeft')) transform.x -= this.speed
    if (isKeyDown('ArrowRight')) transform.x += this.speed
  }
}
