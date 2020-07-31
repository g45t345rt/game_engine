import { h, Fragment } from 'preact'
import GameComponent from '../gameComponent'
import * as Matrix from 'transformation-matrix'
import Transform from './transform'
import Origin from '../misc/origin'

export default class Box extends GameComponent {
  constructor ({ w, h, ox, oy }) {
    super('box')

    this.width = w || 10
    this.height = h || 10

    this.ox = ox || 0.5
    this.oy = oy || 0.5

    this.renderBoundingBox = true
    this.renderBox = true
    this.renderOrigin = true
    this.renderDirectionArrow = true
  }

  editorRender = () => {
    return <Fragment>
      <label>Origin</label>
      <select onChange={(e) => {
        const { value } = e.target
        this.setOrigin(Origin[value])
      }}>
        {Object.keys(Origin).map((key) => {
          return <option key={key} value={key}>{key}</option>
        })}
      </select>
      <label>ox</label>
      <input type='number' value={this.ox} step={0.5} min={-1} max={1} onChange={(e) => (this.ox = e.target.valueAsNumber)} />
      <label>oy</label>
      <input type='number' value={this.oy} step={0.5} min={-1} max={1} onChange={(e) => (this.oy = e.target.valueAsNumber)} />
      <label>Origin POINT</label>
      <span>{JSON.stringify(this.getOriginPoint())}</span>
    </Fragment>
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Transform)
  }

  setOrigin (value) {
    this.ox = value[0]
    this.oy = value[1]
  }

  getOriginPoint = () => ({ x: this.ox * this.width, y: this.oy * this.height })

  update () {
    const originPoint = this.getOriginPoint()
    const transform = this.gameObject.getComponent(Transform)
    transform.translateSelf(-originPoint.x, -originPoint.y)
  }

  getBoundingBox = () => {
    const { matrix } = this.gameObject.getComponent(Transform)
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
    const b = this.getBoundingBox()
    const originPoint = this.getOriginPoint()
    if (b.x + b.width >= w) this.x = w - originPoint.x
    if (b.x <= x) this.x = w + originPoint.x
    if (b.y + b.height >= h) this.y = h - originPoint.y
    if (b.y <= y) this.y = h + originPoint.y
  }

  drawDirectionArrow (ctx) {
    if (!this.renderDirectionArrow) return

    const originPoint = this.getOriginPoint()
    ctx.beginPath()
    ctx.strokeStyle = 'green'
    ctx.moveTo(originPoint.x, originPoint.y)
    ctx.lineTo(originPoint.x + this.width / 2, originPoint.y)
    ctx.stroke()
  }

  drawBoundingBox (ctx) {
    if (!this.renderBoundingBox) return

    const rect = this.getBoundingBox()
    ctx.save()
    ctx.strokeStyle = 'red'
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    ctx.restore()
  }

  drawBox (ctx) {
    if (!this.renderBox) return

    ctx.save()
    ctx.strokeStyle = 'green'
    ctx.strokeRect(0, 0, this.width, this.height)
    ctx.restore()
  }

  drawOrigin (ctx) {
    if (!this.renderOrigin) return

    const dotSize = 5
    const originPoint = this.getOriginPoint()
    const rx = originPoint.x - (dotSize / 2)
    const ry = originPoint.y - (dotSize / 2)

    ctx.save()
    ctx.fillStyle = 'blue'
    ctx.fillRect(rx, ry, dotSize, dotSize)
    ctx.restore()
  }

  render ({ ctx }) {
    const transform = this.gameObject.getComponent(Transform)
    this.drawBoundingBox(ctx)

    ctx.save()
    transform.apply(ctx)
    this.drawBox(ctx)
    this.drawDirectionArrow(ctx)
    this.drawOrigin(ctx)
    ctx.restore()
  }
}
