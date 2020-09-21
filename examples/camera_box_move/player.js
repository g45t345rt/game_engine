import { GameObject, Components } from 'game_engine'

const { Transform, Box, Keyboard } = Components

export default class Player extends GameObject {
  constructor () {
    super({ tag: 'player' })

    this.speed = 1

    this.addComponent(Transform, { x: 100, y: 100 })
    this.addComponent(Box, { w: 50, h: 50 })
    this.addComponent(Keyboard)

    const innerBox = new GameObject()
    innerBox.addComponent(Transform, { x: -10, y: 0, attachedToParent: false })
    innerBox.addComponent(Box, { w: 10, h: 10 })
    this.spawn(innerBox)

    // this.addComponent(FollowMouse)
  }

  update () {
    const transform = this.getComponent(Transform)
    const { isKeyDown } = this.getComponent(Keyboard)

    if (!isKeyDown('Control') && !isKeyDown('Shift')) {
      if (isKeyDown('ArrowUp')) transform.y -= this.speed
      if (isKeyDown('ArrowDown')) transform.y += this.speed
      if (isKeyDown('ArrowLeft')) transform.x -= this.speed
      if (isKeyDown('ArrowRight')) transform.x += this.speed
    }
  }

  /*
  render ({ ctx }) {
    const transform = this.getComponent(Transform)

    ctx.save()
    transform.apply(ctx)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, 50, 50)
    ctx.restore()
  }
  */
}
