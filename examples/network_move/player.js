import { GameObject, Components } from 'game_engine'

const { Keyboard, Box, Transform } = Components

export default class Player extends GameObject {
  constructor () {
    super({ tag: 'player' })
    this.speed = 2
    this.addComponent(Transform, { x: 100, y: 100 })
    this.addComponent(Box, { w: 50, h: 50 })
    this.addComponent(Keyboard)
  }

  clientUpdate () {
    const transform = this.getComponent(Transform)
    const { isKeyDown } = this.getComponent(Keyboard)

    if (isKeyDown('ArrowUp')) transform.y -= this.speed
    if (isKeyDown('ArrowDown')) transform.y += this.speed
    if (isKeyDown('ArrowLeft')) transform.x -= this.speed
    if (isKeyDown('ArrowRight')) transform.x += this.speed
  }

  serverUpdate () {
    //const transform = this.getComponent(Transform)
    //transform.x += 0.1
  }
}
