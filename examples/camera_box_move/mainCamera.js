import { GameObject, Components } from 'game_engine'
const { Camera, Keyboard, Transform } = Components

export default class MainCamera extends GameObject {
  constructor ({ ref }) {
    super({ id: 'mainCamera' })
    this.addComponent(Transform)
    this.addComponent(Camera, { vx: 0, vy: 0, vw: 500, vh: 300, ref })
    this.addComponent(Keyboard)
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
