import { typeBoolOrDefault, typeNumber } from '../typeCheck'
import Component from './component'
import Transform from './transform'

export const OriginType = {
  rotation: 'rotation',
  position: 'position',
  child: 'child'
}

export const Origin = {
  topLeft: { x: 0, y: 0 },
  topRight: { x: 0, y: 1 },
  bottomLeft: { x: 1, y: 0 },
  bottomRight: { x: 1, y: 1 },
  center: { x: .5, y: .5 }
}

export default class Rect extends Component {
  constructor (options = {}) {
    super(options)

    this.w = typeNumber(options.w) // width
    this.h = typeNumber(options.h) // height
  }

  init () {
    this.requiredComponent(Transform)
  }

  setOrigin (originType, { x, y }) {
    const transform = this.getComponent(Transform)
    switch (originType) {
      case OriginType.child:
        transform.cx = x * this.w
        transform.cy = y * this.h
        break
      case OriginType.position:
        transform.ox = x * this.w
        transform.oy = y * this.h
        break
      case OriginType.rotation:
        transform.rx = x * this.w
        transform.ry = y * this.h
        break
    }
  }

  flipX (ctx) {
    ctx.translate(this.w, 0)
    ctx.scale(-1, 1)
  }

  flipY (ctx) {
    ctx.translate(0, this.h)
    ctx.scale(1, -1)
  }

  draw ({ ctx }) {
    const { ox, oy, rx, ry, cx, cy } = this.getComponent(Transform)

    // Draw rect border
    ctx.strokeStyle = 'red'
    ctx.strokeRect(0, 0, this.w, this.h)

    // Draw position point
    let ps = 10 // pointSize
    ctx.fillStyle = 'blue'
    ctx.fillRect(ox - (ps / 2), oy - (ps / 2), ps, ps)

    // Draw rotation point
    ps = 5
    ctx.fillStyle = 'green'
    ctx.fillRect(rx - (ps / 2), ry - (ps / 2), ps, ps)

    // Draw child point
    ctx.fillStyle = 'yellow'
    ctx.fillRect(cx - (ps / 2), cy - (ps / 2), ps, ps)
  }
}