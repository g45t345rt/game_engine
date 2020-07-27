import GameComponent from '../gameComponent'
import * as Matrix from 'transformation-matrix'
import * as React from 'preact'

export default class Transform extends GameComponent {
  constructor ({ x, y, sx, sy, r } = {}) {
    super('transform')

    this.#x = x || 0
    this.#y = y || 0
    this.#scaleX = sx || 1
    this.#scaleY = sy || 1
    this.#rotation = r || 0
  }

  editorRender = () => {
    return <React.Fragment>
      <label>X</label>
      <input type="number" value={this.x} onChange={(e) => (this.x = e.target.valueAsNumber)} />
      <label>Y</label>
      <input type="number" value={this.y} onChange={(e) => (this.y = e.target.valueAsNumber)} />
      <label>Scale [{`${this.scaleX},${this.scaleY}`}]</label>
      <div>
        <input type="range" value={this.scaleX} step={0.1} min={0} max={3} onChange={(e) => (this.scaleX = e.target.value)} />
        <input type="range" value={this.scaleY} step={0.1} min={0} max={3} onChange={(e) => (this.scaleY = e.target.value)} />
      </div>
      <label>Rotation [{this.rotation}]</label>
      <input type="range" value={this.rotation} step={0.1} min={-2 * Math.PI} max={2 * Math.PI} onChange={(e) => (this.rotation = e.target.value)} />
    </React.Fragment>
  }

  getParentTransform () {
    const { parent } = this.gameObject
    if (parent) {
      const transform = parent.getComponent(Transform)
      if (transform) return transform
    }
    return null
  }

  // X
  #x = 0
  get x () {
    const transform = this.getParentTransform()
    if (transform) return transform.x + this.#x + this.#localX
    return this.#x
  }

  set x (x) {
    this.#x = x
  }

  // Y
  #y = 0
  get y () {
    const transform = this.getParentTransform()
    if (transform) return transform.y + this.#y + this.#localY
    return this.#y
  }

  set y (y) {
    this.#y = y
  }

  // localY
  #localY = 0
  get localY () {
    const transform = this.getParentTransform()
    if (!transform) return this.#y
    return this.#localY
  }

  set localY (x) {
    const transform = this.getParentTransform()
    if (!transform) this.#y = x
    else this.#localY = x
  }

  // localX
  #localX = 0
  get localX () {
    const transform = this.getParentTransform()
    if (!transform) return this.#x
    return this.#localX
  }

  set localX (x) {
    const transform = this.getParentTransform()
    if (!transform) this.#x = x
    else this.#localX = x
  }

  // rotation
  #rotation = 0
  get rotation () {
    const transform = this.getParentTransform()
    if (transform) return transform.rotation + this.#rotation + this.#localRotation
    return this.#rotation
  }

  set rotation (r) {
    this.#rotation = r
  }

  // localRotation
  #localRotation = 0
  get localRotation () {
    return this.#localRotation
  }

  set localRotation (r) {
    const transform = this.getParentTransform()
    if (!transform) this.#rotation = r
    else this.#localRotation = r
  }

  // scaleX
  #scaleX = 1
  get scaleX () {
    const transform = this.getParentTransform()
    if (transform) return transform.scaleX * this.#scaleX * this.localScaleX
    return this.#scaleX
  }

  set scaleX (x) {
    this.#scaleX = x
  }

  // scaleY
  #scaleY = 1
  get scaleY () {
    const transform = this.getParentTransform()
    if (transform) return transform.scaleY * this.#scaleY * this.localScaleY
    return this.#scaleY
  }

  set scaleY (y) {
    this.#scaleY = y
  }

  // localScaleX
  #localScaleX = 1
  get localScaleX () {
    return this.#localScaleX
  }

  set localScaleX (x) {
    const transfrom = this.getParentTransform()
    if (!transfrom) this.#scaleX = x
    else this.#localScaleX = x
  }

  // localScaleY
  #localScaleY = 1
  get localScaleY () {
    return this.#localScaleY
  }

  set localScaleY (x) {
    const transfrom = this.getParentTransform()
    if (!transfrom) this.#scaleY = x
    else this.#localScaleY = x
  }

  up (value) {
    const matrix = Matrix.translate(0, value)
    return Matrix.applyToPoint(matrix, { x: 0, y: 0 })
  }

  right (value) {
    const matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(value)
    )
    return Matrix.applyToPoint(matrix, { x: 0, y: 0 })
  }

  translate (x, y) {
    this.matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(x, y)
    )
    return this
  }

  update () {
    const transform = this.getParentTransform()
    if (transform) {
      this.matrix = Matrix.transform(
        transform.matrix,
        Matrix.translate(this.#x + this.#localX, this.#y + this.#localY),
        Matrix.rotate(this.#rotation + this.#localRotation),
        Matrix.scale(this.#scaleX * this.#localScaleX, this.#scaleY * this.#localScaleY)
      )

      return
    }

    this.matrix = Matrix.transform(
      Matrix.translate(this.x, this.y),
      Matrix.rotate(this.rotation),
      Matrix.scale(this.scaleX, this.scaleY)
    )
  }
}
