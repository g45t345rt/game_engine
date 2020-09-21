import GameComponent from '../gameComponent'
import * as Matrix from 'transformation-matrix'
import { h, Fragment } from 'preact'

export default class Transform extends GameComponent {
  constructor ({ x, y, sX, sY, r, rX, rY, attachToParent, startWithParentMatrix } = {}) {
    super('transform')

    this.x = x || 0
    this.y = y || 0
    this.scaleX = sX || 1
    this.scaleY = sY || 1
    this.rotation = r || 0
    this.rX = rX || 0
    this.rY = rY || 0

    this.startWithParentMatrix = true
    if (startWithParentMatrix) this.startWithParentMatrix = false

    this.attachToParent = true
    if (attachToParent === false) this.attachToParent = false

    this.matrix = Matrix.identity()
    this.drawRotationPoint = false
  }

  toString = () => `{ x: ${this.x}, y: ${this.y}, r: ${this.rotation}, s: [${this.scaleX}, ${this.scaleY}] }`

  // eslint-disable-next-line no-undef
  #getParentTransform () {
    if (this.gameObject) {
      const { parent } = this.gameObject
      if (parent) {
        const transform = parent.getComponent(Transform)
        if (transform) return transform
      }
    }

    return null
  }

  static toRadian = (deg) => deg * Math.PI / 180
  static toDeg = (rad) => rad * 180 / Math.PI

  editorRender = (styles) => {
    const transform = this.#getParentTransform()

    return <Fragment>
      <label>Position</label>
      {transform && <div>
        Relative to {transform.gameObject.displayName()}
        Attach to parent: <input type='checkbox' checked={this.attachToParent} onChange={(e) => (this.attachToParent = e.target.checked)} />
        Start with parent matrix: <input type='checkbox' checked={this.startWithParentMatrix} onChange={(e) => (this.startWithParentMatrix = e.target.checked)} />
      </div>}
      <div>
        <label>X</label>
        <input type='number' value={this.x} step={1} onChange={(e) => (this.x = e.target.valueAsNumber)} />
        <label>Y</label>
        <input type='number' value={this.y} step={1} onChange={(e) => (this.y = e.target.valueAsNumber)} />
      </div>
      <label>Scale</label>
      <div>
        <label>X</label>
        <input type='number' value={this.scaleX} step={0.1} onChange={(e) => (this.scaleX = e.target.valueAsNumber)} />
        <label>Y</label>
        <input type='number' value={this.scaleY} step={0.1} onChange={(e) => (this.scaleY = e.target.valueAsNumber)} />
      </div>
      <label>Rotation</label>
      <div>
        <input type='number' value={Transform.toDeg(this.rotation)} step={1} min={-360} max={360} onChange={(e) => {
          this.rotation = Transform.toRadian(e.target.valueAsNumber)
        }} />
        <label>X</label>
        <input type='number' value={this.rX} onChange={(e) => (this.rX = e.target.valueAsNumber)} />
        <label>Y</label>
        <input type='number' value={this.rY} onChange={(e) => (this.rY = e.target.valueAsNumber)} />
      </div>
      <label>Draw Rotation Point</label>
      <input type='checkbox' checked={this.drawRotationPoint} onChange={(e) => (this.drawRotationPoint = e.target.checked)} />
        <span>{JSON.stringify(this.matrix)}</span>
    </Fragment>
  }

  getPoint = (x, y) => Matrix.applyToPoint(this.matrix, { x, y })

  up (value, x, y) {
    const matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(0, value)
    )

    return Matrix.applyToPoint(matrix, { x: x || 0, y: y || 0 })
  }

  right = (value, x, y) => {
    const matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(value, 0)
    )

    return Matrix.applyToPoint(matrix, { x: x || 0, y: y || 0 })
  }

  localRight = (value, x, y) => {
    const matrix = Matrix.transform(
      this.localMatrix,
      Matrix.translate(value, 0)
    )

    return Matrix.applyToPoint(matrix, { x: x || 0, y: y || 0 })
  }

  /*
  #setGlobalMatrix () {
    const parentTransform = this.#getParentTransform()
    let parentMatrix = Matrix.identity()
    if (parentTransform) parentMatrix = parentTransform.globalMatrix

    this.globalMatrix = Matrix.transform(
      parentMatrix,
      this.localMatrix
    )
  }

  #setLocalMatrix () {
    this.localMatrix = Matrix.transform(
      Matrix.translate(this.x, this.y),
      Matrix.scale(this.scaleX, this.scaleY),
      Matrix.rotate(this.rotation, this.rX, this.rY)
    )
  }*/

  transform (matrix) {
    this.matrix = Matrix.transform(
      this.matrix,
      matrix
    )

    //this.#setGlobalMatrix()
  }

  translate (x, y) {
    this.matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(x, y)
    )

    //this.#setGlobalMatrix()
  }

  scale (x, y) {
    this.matrix = Matrix.transform(
      this.matrix,
      Matrix.scale(x, y)
    )

    //this.#setGlobalMatrix()
  }

  rotate (r) {
    this.matrix = Matrix.transform(
      this.matrix,
      Matrix.ratate(r)
    )

    //this.#setGlobalMatrix()
  }

  // distance between two points https://www.mathsisfun.com/algebra/distance-2-points.html
  distance = (x, y) => Math.sqrt((this.x - x) ^ 2 + (this.y - y) ^ 2)

  engineUpdate () {
    const parentTransform = this.#getParentTransform()

    let matrix = Matrix.identity()
    if (parentTransform) {
      if (!this.startMatrix) {
        // keep copy of parent matrix
        this.startMatrix = parentTransform.matrix // transform relative to parent but not affected by changes
      }

      if (this.attachToParent) {
        matrix = parentTransform.matrix // transform relative to parent
      } else if (this.startWithParentMatrix) {
        matrix = this.startMatrix
      }
    }

    this.localMatrix = Matrix.transform(
      Matrix.translate(this.x, this.y),
      Matrix.scale(this.scaleX, this.scaleY),
      Matrix.rotate(this.rotation, this.rX, this.rY)
    )

    this.matrix = Matrix.transform(
      matrix,
      this.localMatrix
    )

    //this.#setLocalMatrix()
    //this.#setGlobalMatrix()
  }

  #drawRotationPoint (ctx) {
    if (!this.drawRotationPoint) return
    const dotSize = 5
    ctx.fillStyle = 'purple'

    ctx.fillRect(this.rX, this.rY, dotSize, dotSize)
  }

  render ({ ctx, offsetMatrix }) {
    ctx.resetTransform()
    const offset = offsetMatrix || Matrix.identity()
    ctx.setTransform(Matrix.transform(
      offset,
      this.matrix
    ))

    /*
    if (!this.attachedToParent) {
      ctx.resetTransform()
      this.apply(ctx, Matrix.transform(
        offsetMatrix,
        this.matrix
      ))
    } else {
      this.apply(ctx, this.localMatrix)
    }*/

    this.#drawRotationPoint(ctx)
  }
}
