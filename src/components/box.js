/* eslint-disable no-undef */
import { h, Fragment } from 'preact'
import GameComponent from '../gameComponent'
import * as Matrix from 'transformation-matrix'
import Transform from './transform'
import Origin, { getOriginKey } from '../misc/origin'

export default class Box extends GameComponent {
  constructor ({ w, h, oX, oY, flipX, flipY, draw } = {}) {
    super('box')

    this.width = w || 10
    this.height = h || 10
    this.flipX = flipX || false
    this.flipY = flipY || false

    this.oX = oX || 0
    this.oY = oY || 0

    if (draw === undefined) this.draw = true
    else this.draw = draw

    this.drawBoundingBox = true
    this.drawBox = true
    this.drawOrigin = true
    this.drawDirectionArrow = true
  }

  editorRender = () => {
    return <Fragment>
      <label>Size</label>
      <div>
        <label>W</label>
        <input type='number' value={this.width} step={1} onChange={(e) => (this.width = e.target.valueAsNumber)} />
        <label>H</label>
        <input type='number' value={this.height} step={1} onChange={(e) => (this.height = e.target.valueAsNumber)} />
      </div>
      <label>Origin</label>
      <select value={getOriginKey([this.oX, this.oy])} onChange={(e) => {
        const { value } = e.target
        this.setOrigin(Origin[value])
      }}>
        {Object.keys(Origin).map((key) => {
          return <option key={key} value={key}>{key}</option>
        })}
      </select>
      <div>
        <label>OX</label>
        <input type='number' value={this.oX} step={0.5} min={0} max={1} onChange={(e) => (this.oX = e.target.valueAsNumber)} />
        <label>OY</label>
        <input type='number' value={this.oY} step={0.5} min={0} max={1} onChange={(e) => (this.oY = e.target.valueAsNumber)} />
      </div>
      <label>Origin Point</label>
      <span>{JSON.stringify(this.getOriginPoint())}</span>
      <label>Flip</label>
      <div>
        <label>X</label>
        <input type='checkbox' checked={this.flipX} onChange={(e) => (this.flipX = e.target.checked)} />
        <label>Y</label>
        <input type='checkbox' checked={this.flipY} onChange={(e) => (this.flipY = e.target.checked)} />
      </div>
      <label>Draw</label>
      <input type='checkbox' checked={this.draw} onChange={(e) => (this.draw = e.target.checked)} />
      <label>Draw Origin Point</label>
      <input type='checkbox' checked={this.drawOrigin} onChange={(e) => (this.drawOrigin = e.target.checked)} />
      <label>Draw Box Border</label>
      <input type='checkbox' checked={this.drawBox} onChange={(e) => (this.drawBox = e.target.checked)} />
      <label>Draw Direction Arrow</label>
      <input type='checkbox' checked={this.drawDirectionArrow} onChange={(e) => (this.drawDirectionArrow = e.target.checked)} />
      <label>Draw Bounding Box</label>
      <input type='checkbox' checked={this.drawBoundingBox} onChange={(e) => (this.drawBoundingBox = e.target.checked)} />
    </Fragment>
  }

  toString = () => `{w:${this.width}, h:${this.height}}`

  onAdd = () => {
    this.gameObject.requiredComponent(Transform)
  }

  setOrigin (value) {
    this.oX = value[0]
    this.oY = value[1]
  }

  getOriginPoint = () => ({ x: this.oX * this.width, y: this.oY * this.height })

  getBoundingBox = () => {
    const transform = this.gameObject.getComponent(Transform)
    //const { x, y } = this.getOriginPoint()
    //const matrix = Matrix.transform(transform.getMatrix(), Matrix.translate(-x, -y))
    const matrix = transform.matrix
    const bottomRight = Matrix.applyToPoint(matrix, { x: this.width, y: this.height })
    const topRight = Matrix.applyToPoint(matrix, { x: this.width, y: 0 })
    const topLeft = Matrix.applyToPoint(matrix, { x: 0, y: 0 })
    const bottomLeft = Matrix.applyToPoint(matrix, { x: 0, y: this.height })

    const minX = Math.min(Math.min(topLeft.x, topRight.x), Math.min(bottomLeft.x, bottomRight.x))
    const minY = Math.min(Math.min(topLeft.y, topRight.y), Math.min(bottomLeft.y, bottomRight.y))
    const maxX = Math.max(Math.max(topLeft.x, topRight.x), Math.max(bottomLeft.x, bottomRight.x))
    const maxY = Math.max(Math.max(topLeft.y, topRight.y), Math.max(bottomLeft.y, bottomRight.y))
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY }
  }

  // Constrain movement
  limit = (x, y, w, h) => {
    const transform = this.gameObject.getComponent(Transform)
    const box = this.getBoundingBox()
    const op = this.getOriginPoint()

    // Right
    if (box.x + box.width >= w) transform.x = w - op.x
    // Left
    if (box.x <= x) transform.x = w + op.x
    // Bottom
    if (box.y + box.height >= h) transform.y = h - op.y
    // Top
    if (box.y <= y) transform.y = h + op.y
  }

  #drawDirectionArrow (ctx) {
    if (!this.drawDirectionArrow) return

    const op = this.getOriginPoint()
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(op.x, op.y)
    ctx.lineTo(op.x + this.width / 2, op.y)
    ctx.stroke()
  }

  #drawBoundingBox (args) {
    if (!this.drawBoundingBox) return

    const { ctx, offsetMatrix } = args
    const rect = this.getBoundingBox()
    ctx.save()
    ctx.resetTransform()
    ctx.setTransform(offsetMatrix)
    ctx.strokeStyle = 'red'
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    ctx.restore()
  }

  #drawBox (ctx) {
    if (!this.drawBox) return

    ctx.strokeStyle = 'green'
    ctx.strokeRect(0, 0, this.width, this.height)
  }

  #drawOrigin (ctx) {
    if (!this.drawOrigin) return

    const dotSize = 5
    const originPoint = this.getOriginPoint()
    const rx = originPoint.x - (dotSize / 2)
    const ry = originPoint.y - (dotSize / 2)

    ctx.fillStyle = 'blue'
    ctx.fillRect(rx, ry, dotSize, dotSize)
  }

  engineUpdate () {
    const op = this.getOriginPoint()
    const transform = this.gameObject.getComponent(Transform)

    transform.translate(-op.x, -op.y)

    if (this.flipX) {
      transform.translate(this.width, 0)
      transform.scale(-1, 1)
    }

    if (this.flipY) {
      transform.translate(0, this.height)
      transform.scale(1, -1)
    }
  }

  render (args) {
    const { ctx } = args
    if (this.draw) {
      this.#drawBoundingBox(args)
      this.#drawBox(ctx)
      this.#drawDirectionArrow(ctx)
      this.#drawOrigin(ctx)
    }
  }
}
