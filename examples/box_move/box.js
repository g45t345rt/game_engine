import { Component, components, Input } from 'gemer'
import { editableEl } from '../../src/debug/controls'
import { createTableEl, newEl, setElValue, setElRender } from '../../src/ui'
const { Rect, Transform } = components

export class Box extends Component {
  constructor (options) {
    super(options)

    this.speed = 1
  }

  update ({ deltaTime }) {
    const transform = this.getComponent(Transform)

    const speed = this.speed * deltaTime
    if (Input.isKeyDown('KeyW')) {
      transform.y -= speed
    }

    if (Input.isKeyDown('KeyS')) {
      transform.y += speed
    }

    if (Input.isKeyDown('KeyA')) {
      transform.x -= speed
    }

    if (Input.isKeyDown('KeyD')) {
      transform.x += speed
    }
  }

  draw ({ ctx }) {
    const rect = this.getComponent(Rect)

    ctx.fillStyle = 'yellow'
    ctx.fillRect(0, 0, rect.w, rect.h)
  }

  inspector () {
    const container = newEl('div')

    const { rows, table } = createTableEl({ rows: 2, columns: 2 })
    setElValue(rows[0][1], 'Value')

    setElValue(rows[1][0], 'Speed')
    const speedEl = rows[1][1]
    setElRender(speedEl, () => this.speed)
    editableEl(speedEl, { onChange: (v) => this.speed = v })
    container.append(table)

    return {
      container
    }
  }
}

export default Box
