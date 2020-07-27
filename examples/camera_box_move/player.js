import { GameObject, Components } from 'game_engine'

const { Box, FollowMouse, Control, Transform } = Components

export default class Player extends GameObject {
  constructor () {
    super({ tag: 'player' })

    this.addComponent(Transform, { x: 100, y: 0 })
    //this.addComponent(FollowMouse)
  }

  update () {
    const transform = this.getComponent(Transform)

  }

  render ({ ctx }) {
    const transform = this.getComponent(Transform)

    ctx.save()
    ctx.setTransform(transform.matrix)
    ctx.strokeStyle = 'green'
    ctx.strokeRect(0, 0, 50, 50)
    ctx.restore()
  }
}
