import { GameObject, Components } from 'game_engine'
const { Camera, Keyboard, Transform } = Components

export default class MainCamera extends GameObject {
  constructor () {
    super({ id: 'mainCamera' })
    this.addComponent(Transform)
    this.addComponent(Camera, { vx: 0, vy: 0, vw: 500, vh: 300 })
    this.addComponent(Keyboard)
  }

  update () {
    const keyboard = this.getComponent(Keyboard)
    const camera = this.getComponent(Camera)

    if (keyboard.isKeyDown('Shift')) {
      if (keyboard.isKeyDown('ArrowRight')) camera.viewX += 1
      if (keyboard.isKeyDown('ArrowLeft')) camera.viewX -= 1
      if (keyboard.isKeyDown('ArrowUp')) camera.viewY -= 1
      if (keyboard.isKeyDown('ArrowDown')) camera.viewY += 1
    }

    const transform = this.getComponent(Transform)
    if (keyboard.isKeyDown('Control')) {
      if (keyboard.isKeyDown('ArrowRight')) transform.x -= 1
      if (keyboard.isKeyDown('ArrowLeft')) transform.x += 1
      if (keyboard.isKeyDown('ArrowUp')) transform.y += 1
      if (keyboard.isKeyDown('ArrowDown')) transform.y -= 1
    }
  }
}
