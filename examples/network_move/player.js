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

  update () {
    const transform = this.getComponent(Transform)
    if (this.isClient) {
      const { isKeyDown, isSomeKeysDown } = this.getComponent(Keyboard)

      if (isSomeKeysDown(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])) {
        if (isKeyDown('ArrowUp')) transform.y -= this.speed
        if (isKeyDown('ArrowDown')) transform.y += this.speed
        if (isKeyDown('ArrowLeft')) transform.x -= this.speed
        if (isKeyDown('ArrowRight')) transform.x += this.speed

        //this.socket.send(transform.x)
      }
    } else {
      //this.socket.send(Math.random() * 500)
    }
  }

  dataFromServer (msg) {
    const transform = this.getComponent(Transform)
    transform.x = parseFloat(msg)
    //console.log(msg)
  }

  dataFromClient (msg) {
    console.log(msg)
  }
}
