import GameComponent from '../gameComponent'
import * as Matrix from 'transformation-matrix'

import Transform from './transform'
import Box from './box'
import Mouse from './mouse'

export default class MouseDrag extends GameComponent {
  type = 'client'

  constructor () {
    super('mouseDrag')
    this.isDragging = false
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Box)
    this.gameObject.requiredComponent(Mouse)
  }

  update () {
    
  }

  render ({ ctx, offsetMatrix }) {
    const mouse = this.gameObject.getComponent(Mouse)
    const transform = this.gameObject.getComponent(Transform)
    const box = this.gameObject.getComponent(Box)

    const matrix = Matrix.inverse(Matrix.transform(
      offsetMatrix,
      transform.globalMatrix
    ))
    const { x, y } = Matrix.applyToPoint(matrix, { x: mouse.x, y: mouse.y })
    this.cX = Math.round(x)
    this.cY = Math.round(y)

    if (
      this.cX >= 0 && this.cX <= box.width &&
      this.cY >= 0 && this.cY <= box.height) {
      this.isOver = true
    } else if (!mouse.isDown) {
      this.isOver = false
    }

    if (mouse.isDown && this.isOver) {
      if (!this.isDragging) {
        this.offsetX = mouse.x - transform.x
        this.offsetY = mouse.y - transform.y
      }

      this.isDragging = true
    } else {
      this.isDragging = false
    }

    if (this.isDragging) {
      transform.x = mouse.x - this.offsetX
      transform.y = mouse.y - this.offsetY
    }

    ctx.fillText(`${this.cX},${this.cY}`, 100, 0)
    ctx.fillText(this.isDragging, 250, 0)
  }
}
