import GameComponent from '../gameComponent'
import * as Matrix from 'transformation-matrix'
import { h, Fragment } from 'preact'

export default class Transform extends GameComponent {
  #local = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 } // position relative to parent

  constructor ({ x, y, sx, sy, r } = {}) {
    super('transform')

    this.x = x || 0
    this.y = y || 0
    this.scaleX = sx || 1
    this.scaleY = sy || 1
    this.rotation = r || 0

    this.updateMatrix()
  }

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

  // eslint-disable-next-line no-undef
  #getLocal (key, op = '+') {
    const transform = this.#getParentTransform()
    if (transform) {
      const parentKey = `local${key.charAt(0).toUpperCase() + key.slice(1)}`
      if (op === '*') return transform[parentKey] * this.#local[key]
      return transform[parentKey] + this.#local[key]
    }

    return this[key]
  }

  // eslint-disable-next-line no-undef
  #setLocal (key, value, op = '-') {
    const transform = this.#getParentTransform()
    if (transform) {
      const parentKey = `local${key.charAt(0).toUpperCase() + key.slice(1)}`
      if (op === '/') return this.#local[key] = value / transform[parentKey]
      return this.#local[key] = value - transform[parentKey]
    }

    this[key] = value
  }

  get localX () {
    return this.#getLocal('x')
  }

  set localX (x) {
    this.#setLocal('x', x)
  }

  get localY () {
    return this.#getLocal('y')
  }

  set localY (y) {
    return this.#setLocal('y', y)
  }

  get localRotation () {
    return this.#getLocal('rotation')
  }

  set localRotation (r) {
    this.#setLocal('rotation', r)
  }

  get localScaleX () {
    return this.#getLocal('scaleX', '*')
  }

  set localScaleX (sx) {
    this.#setLocal('scaleX', sx, '/')
  }

  get localScaleY () {
    return this.#getLocal('scaleY', '*')
  }

  set localScaleY (sy) {
    return this.#setLocal('scaleY', sy, '/')
  }

  setRotationInDegree (deg) {
    this.rotation = deg * Math.PI / 180
  }

  getRotationInDegree = () => Math.round(this.rotation * 180 / Math.PI)

  setLocalRotationInDegree (deg) {
    this.localRotation = deg * Math.PI / 180
  }

  getLocalRotationInDegree = () => Math.round(this.localRotation * 180 / Math.PI)

  updateMatrix () {
    const transform = this.#getParentTransform()
    if (transform) {
      this.matrix = Matrix.transform(
        Matrix.translate(this.x + this.localX, this.y + this.localY),
        Matrix.rotate(this.rotation + this.localRotation),
        Matrix.scale(this.scaleX * this.localScaleX, this.scaleY * this.localScaleY)
      )

      return
    }

    this.matrix = Matrix.transform(
      Matrix.translate(this.x, this.y),
      Matrix.rotate(this.rotation),
      Matrix.scale(this.scaleX, this.scaleY)
    )
  }

  translateSelf (x, y) {
    this.matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(x, y)
    )
    return this
  }

  apply (ctx) {
    const { a, b, c, d, e, f } = this.matrix
    ctx.transform(a, b, c, d, e, f)
  }

  right (value) {
    const matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(value, 0)
    )

    const { x, y } = Matrix.applyToPoint(matrix, { x: 0, y: 0 })
    this.x = x
    this.y = y
  }

  up (value, ox, oy) {
    const matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(0, value)
    )

    const { x, y } = Matrix.applyToPoint(matrix, { x: ox || 0, y: oy || 0 })
    this.x = x
    this.y = y
  }

  editorRender = (styles) => {
    const transform = this.#getParentTransform()

    return <Fragment>
      <label class={styles.subtab}>Global</label>
      <label>Position</label>
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
      <input type='number' value={this.getRotationInDegree()} step={1} min={-360} max={360} onChange={(e) => {
        this.setRotationInDegree(e.target.valueAsNumber)
      }} />
      <label class={styles.subtab}>Local</label>
      <label>Position</label>
      {!transform && <div>No parent same as global</div>}
      {transform && <div>Relative to {transform.gameObject.displayName()}</div>}
      <div>
        <label>X</label>
        <input type='number' value={this.localX} step={1} onChange={(e) => (this.localX = e.target.valueAsNumber)} />
        <label>Y</label>
        <input type='number' value={this.localY} step={1} onChange={(e) => (this.localY = e.target.valueAsNumber)} />
      </div>
      <label>Scale</label>
      <div>
        <label>X</label>
        <input type='number' value={this.localScaleX} step={0.1} onChange={(e) => (this.localScaleX = e.target.valueAsNumber)} />
        <label>Y</label>
        <input type='number' value={this.localScaleY} step={0.1} onChange={(e) => (this.localScaleY = e.target.valueAsNumber)} />
      </div>
      <label>Rotation</label>
      <input type='number' value={this.getLocalRotationInDegree()} step={1} min={-360} max={360} onChange={(e) => {
        this.setLocalRotationInDegree(e.target.valueAsNumber)
      }} />
    </Fragment>
  }

  update () {
    this.updateMatrix()
  }
}
