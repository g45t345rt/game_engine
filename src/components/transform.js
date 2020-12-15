import { scale, rotate, translate, compose } from 'transformation-matrix'
import { typeNumberOrDefault } from '../typeCheck'
import Component from './component'

export default class Transform extends Component {
  constructor (options = {}) {
    super(options)

    this.x = typeNumberOrDefault(options.x, 0) // x position
    this.y = typeNumberOrDefault(options.y, 0) // y position
    this.ox = typeNumberOrDefault(options.ox, 0) // originX
    this.oy = typeNumberOrDefault(options.oy, 0) // originY
    this.sx = typeNumberOrDefault(options.sx, 1) // scaleX
    this.sy = typeNumberOrDefault(options.sy, 1) // scaleY
    this.r = typeNumberOrDefault(options.r, 0) // rotation in radian
    this.rx = typeNumberOrDefault(options.rx, 0) // rotationX
    this.ry = typeNumberOrDefault(options.ry, 0) // rotationY
    this.cx = typeNumberOrDefault(options.cx, 0) // child x offset
    this.cy = typeNumberOrDefault(options.cy, 0) // child y offset
  }

  init () {
    this.updateMatrix()
  }

  getParentTransform () {
    const { parent } = this.gameObject
    if (parent) return parent.getComponent(Transform)
  }

  updateMatrix () {
    const parentTransform = this.getParentTransform()
    if (parentTransform) {
      const { cx, cy } = parentTransform
      this.matrix = compose(
        translate(this.x - this.ox + cx, this.y - this.oy + cy),
        rotate(this.r, this.rx, this.ry),
        scale(this.sx, this.sy)
      )

      this.worldMatrix = compose(
        parentTransform.worldMatrix,
        this.matrix
      )
    } else {
      this.matrix = compose(
        translate(this.x - this.ox, this.y - this.oy),
        rotate(this.r, this.rx, this.ry),
        scale(this.sx, this.sy)
      )

      this.worldMatrix = this.matrix // no parent so localMatrix is the worldMatrix
    }
  }

  update () {
    this.updateMatrix()
  }

  draw ({ ctx }) {
    const { a, b, c, d, e, f } = this.matrix
    ctx.transform(a, b, c, d, e, f)
  }
}