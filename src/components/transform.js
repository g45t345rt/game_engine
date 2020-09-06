import GameComponent from '../gameComponent'
import * as Matrix from 'transformation-matrix'
import { h, Fragment } from 'preact'

export default class Transform extends GameComponent {
  constructor ({ x, y, sX, sY, r, rX, rY } = {}) {
    super('transform')

    this.x = x || 0
    this.y = y || 0
    this.scaleX = sX || 1
    this.scaleY = sY || 1
    this.rotation = r || 0
    this.rX = rX || 0
    this.rY = rY || 0

    this.drawRotationPoint = false
    //this.localMatrix = Matrix.identity()
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

  setRotationInDegree (deg) {
    this.rotation = deg * Math.PI / 180
  }

  getRotationInDegree = () => Math.round(this.rotation * 180 / Math.PI)

  right (value) {
    const matrix = Matrix.transform(
      this.localMatrix,
      Matrix.translate(value, 0)
    )

    const { x, y } = Matrix.applyToPoint(matrix, { x: 0, y: 0 })
    this.x = x
    this.y = y
  }

  up (value, ox, oy) {
    const matrix = Matrix.transform(
      this.localMatrix,
      Matrix.translate(0, value)
    )

    const { x, y } = Matrix.applyToPoint(matrix, { x: ox || 0, y: oy || 0 })
    this.x = x
    this.y = y
  }

  editorRender = (styles) => {
    const transform = this.#getParentTransform()

    return <Fragment>
      <label>Position</label>
      {transform && <div>Relative to {transform.gameObject.displayName()}</div>}
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
        <input type='number' value={this.getRotationInDegree()} step={1} min={-360} max={360} onChange={(e) => {
          this.setRotationInDegree(e.target.valueAsNumber)
        }} />
        <label>X</label>
        <input type='number' value={this.rX} onChange={(e) => (this.rX = e.target.valueAsNumber)} />
        <label>Y</label>
        <input type='number' value={this.rY} onChange={(e) => (this.rY = e.target.valueAsNumber)} />
      </div>
    </Fragment>
  }

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
  }

  transform (matrix) {
    this.localMatrix = Matrix.transform(
      this.localMatrix,
      matrix
    )

    this.#setGlobalMatrix()
  }

  translate (x, y) {
    this.localMatrix = Matrix.transform(
      this.localMatrix,
      Matrix.translate(x, y)
    )

    this.#setGlobalMatrix()
  }

  scale (x, y) {
    this.localMatrix = Matrix.transform(
      this.localMatrix,
      Matrix.scale(x, y)
    )

    this.#setGlobalMatrix()
  }

  rotate (r) {
    this.localMatrix = Matrix.transform(
      this.localMatrix,
      Matrix.ratate(r)
    )

    this.#setGlobalMatrix()
  }

  update () {
    this.#setLocalMatrix()
    this.#setGlobalMatrix()
  }

  #drawRotationPoint (ctx) {
    if (!this.drawRotationPoint) return
    const dotSize = 5
    ctx.fillStyle = 'purple'

    ctx.fillRect(this.rX, this.rY, dotSize, dotSize)
  }

  render ({ ctx }) {
    const { a, b, c, d, e, f } = this.localMatrix
    ctx.transform(a, b, c, d, e, f)

    this.#drawRotationPoint(ctx)
  }
}
