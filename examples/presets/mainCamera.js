import { GameObject, Components } from 'game_engine'
const { Camera, Keyboard, Transform } = Components

export default class MainCamera extends GameObject {
  constructor ({ render, vx, vy, vw, vh, x, y }) {
    super({ id: 'mainCamera', render })

    this.addComponent(Transform, { x, y })
    this.addComponent(Camera, { vx, vy, vw, vh })
    this.addComponent(Keyboard)
  }

  preRender (args) {
    const camera = this.getComponent(Camera)
    const { ctx } = args
    camera.attach(ctx)
  }

  postRender (args) {
    const camera = this.getComponent(Camera)
    const { ctx } = args
    camera.detach(ctx)
  }

  update () {
    const { isKeyDown } = this.getComponent(Keyboard)
    const camera = this.getComponent(Camera)

    if (isKeyDown('Shift')) {
      if (isKeyDown('ArrowRight')) camera.viewX += 1
      if (isKeyDown('ArrowLeft')) camera.viewX -= 1
      if (isKeyDown('ArrowUp')) camera.viewY -= 1
      if (isKeyDown('ArrowDown')) camera.viewY += 1
    }

    const transform = this.getComponent(Transform)
    if (isKeyDown('Control')) {
      if (isKeyDown('ArrowRight')) transform.x -= 1
      if (isKeyDown('ArrowLeft')) transform.x += 1
      if (isKeyDown('ArrowUp')) transform.y += 1
      if (isKeyDown('ArrowDown')) transform.y -= 1
    }
  }
}
