import { scale, rotate, translate, compose } from 'transformation-matrix'
import { dividerEl } from '../editor/controls'
import { typeNumberOrDefault } from '../typeCheck'
import { createTableEl, newEl, setElRender, setElValue } from '../ui'
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
    this.sox = typeNumberOrDefault(options.sox, 0) // scale x offset
    this.soy = typeNumberOrDefault(options.soy, 0) // scale y offset
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
        scale(this.sx, this.sy, this.sox, this.soy)
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

  inspector () {
    const container = newEl('div')

    const { rows: tr, table: tt } = createTableEl({ rows: 4, columns: 3 })

    setElValue(tr[0][0], 'Local')
    setElValue(tr[0][1], 'X')
    setElValue(tr[0][2], 'Y')

    // Position
    setElValue(tr[1][0], 'Position')

    const positionX = tr[1][1]
    setElRender(positionX, () => this.x)

    const positionY = tr[1][2]
    setElRender(positionY, () => this.y)

    // Rotation
    setElValue(tr[2][0], 'Rotation')
    const rotation = tr[2][1]
    const rotationNext = tr[2][2]
    rotationNext.parentNode.removeChild(rotationNext)
    rotation.colSpan = '2'
    setElRender(rotation, () => this.r)

    // Scale
    setElValue(tr[3][0], 'Scale')

    const scaleX = tr[3][1]
    setElRender(scaleX, () => this.sx)

    const scaleY = tr[3][2]
    setElRender(scaleY, () => this.sy)

    // Origins
    const { rows: or, table: ot } = createTableEl({ rows: 4, columns: 3 })

    setElValue(or[0][0], 'Origin')
    setElValue(or[0][1], 'X')
    setElValue(or[0][2], 'Y')

    // Origin
    setElValue(or[1][0], 'Position')

    const originX = or[1][1]
    setElRender(originX, () => this.ox)

    const originY = or[1][2]
    setElRender(originY, () => this.oy)

    // Rotation origin
    setElValue(or[2][0], 'Rotation')

    const rotationX = or[2][1]
    setElRender(rotationX, () => this.rx)

    const rotationY = or[2][2]
    setElRender(rotationY, () => this.ry)

    // Scale origin
    setElValue(or[3][0], 'Scale')

    const scaleOX = or[3][1]
    setElRender(scaleOX, () => this.sox)

    const scaleOY = or[3][2]
    setElRender(scaleOY, () => this.soy)

    // Child origin
    setElValue(or[4][0], 'Child')

    const childX = or[4][1]
    setElRender(childX, () => this.cx)

    const childY = or[4][2]
    setElRender(childY, () => this.cy)

    container.append(tt, dividerEl(), ot, dividerEl())

    // World matrix buttons
    const worldMatrixInput = newEl('input')
    worldMatrixInput.type = 'button'
    setElValue(worldMatrixInput, 'World matrix')

    container.append(worldMatrixInput)

    return {
      container,
      elements: [positionX, positionY]
    }
  }
}
