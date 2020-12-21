import { Component, components, Input } from 'gemer'
import { editableEl } from '../../src/debug/controls'
import { createTableEl, newEl, setElValue, setElRender } from '../../src/ui'
const { Rect, Transform } = components

export class Box extends Component {
  constructor (options) {
    super(options)

    this.speed = 1
  }

  init () {
    this.rect = this.getComponent(Rect)
    this.transform = this.getComponent(Transform)
  }

  update ({ deltaTime }) {
    const speed = this.speed * deltaTime
    if (Input.isKeyDown('KeyW')) {
      this.transform.y -= speed
    }

    if (Input.isKeyDown('KeyS')) {
      this.transform.y += speed
    }

    if (Input.isKeyDown('KeyA')) {
      this.transform.x -= speed
    }

    if (Input.isKeyDown('KeyD')) {
      this.transform.x += speed
    }
  }

  draw ({ ctx }) {
    ctx.fillStyle = 'yellow'
    ctx.fillRect(0, 0, this.rect.w, this.rect.h)
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
