import { GameObject, Components } from 'game_engine'
const { Keyboard, Transform, Box } = Components

class View extends GameObject {
  constructor ({ gameObjectToRender, x, y, rX, rY }) {
    super({ tag: 'view' })
    this.gameObjectToRender = gameObjectToRender
    this.addComponent(Transform, { x, y, rX, rY })
  }

  render (args) {
    const transform = this.getComponent(Transform)
    args.offsetMatrix = transform.globalMatrix
    this.gameObjectToRender.dispatch('render', args, { force: true })
  }
}

export default class MainCamera extends GameObject {
  constructor ({ gameObjectToRender, w, h, x, y, viewX, viewY }) {
    super({ tag: 'mainCamera' })

    this.addComponent(Transform, { x, y })
    const box = this.addComponent(Box, { w, h })
    box.draw = false

    this.addComponent(Keyboard)
    this.spawn(View, { gameObjectToRender, x: viewX, y: viewY, w, h, rX: w/2, rY: h/2 })
    //this.addComponent(MouseDrag)
  }

  render ({ ctx }) {
    // position modify by Transform component
    const box = this.getComponent(Box)
    const transform = this.getComponent(Transform)
    const viewObject = this.getGameObject({ tag: 'view' })
    const viewTransform = viewObject.getComponent(Transform)

    const { width, height } = box

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)

    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.clip()

    ctx.textBaseline = 'top'
    ctx.font = '12px sans-serif'
    ctx.fillStyle = 'white'
    ctx.fillText(`View: ${viewTransform.toString()}`, 0, 0)
    ctx.fillText(`Camera: ${transform.toString()} ${box.toString()}`, 0, parseInt(ctx.font, 10))
  }

  update () {
    const { isKeyDown } = this.getComponent(Keyboard)
    const transform = this.getComponent(Transform)
    const viewObject = this.getGameObject({ tag: 'view' })
    const viewTransform = viewObject.getComponent(Transform)

    if (isKeyDown('Shift')) {
      if (isKeyDown('ArrowRight')) viewTransform.x -= 1
      if (isKeyDown('ArrowLeft')) viewTransform.x += 1
      if (isKeyDown('ArrowUp')) viewTransform.y += 1
      if (isKeyDown('ArrowDown')) viewTransform.y -= 1
    }

    if (isKeyDown('Control')) {
      if (isKeyDown('ArrowRight')) transform.x += 1
      if (isKeyDown('ArrowLeft')) transform.x -= 1
      if (isKeyDown('ArrowUp')) transform.y -= 1
      if (isKeyDown('ArrowDown')) transform.y += 1
    }

    if (isKeyDown('=')) {
      viewTransform.scaleX += 0.01
      viewTransform.scaleY += 0.01
    }

    if (isKeyDown('-')) {
      viewTransform.scaleX -= 0.01
      viewTransform.scaleY -= 0.01
    }
  }
}
