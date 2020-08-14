import GameComponent from '../gameComponent'
import { h, Fragment } from 'preact'

import Transform from './transform'

export default class Camera extends GameComponent {
  constructor ({ ref, vx, vy, vw, vh, vox, voy }) {
    super('camera')

    this.ref = ref
    this.viewX = vx || 0
    this.viewY = vy || 0
    this.viewW = vw
    this.viewH = vh
    this.viewOX = vox || 0.5
    this.viewOY = voy || 0.5
    this.renderCamPosition = true
  }

  editorRender = () => {
    return <Fragment>
      <label>ViewX</label>
      <input type='number' value={this.viewX} onChange={(e) => (this.viewX = e.target.valueAsNumber || 0)} />
      <label>ViewY</label>
      <input type='number' value={this.viewY} onChange={(e) => (this.viewY = e.target.valueAsNumber || 0)} />
      <label>View Width</label>
      <input type='number' value={this.viewW} onChange={(e) => (this.viewW = e.target.valueAsNumber || 0)} />
      <label>View Height</label>
      <input type='number' value={this.viewH} onChange={(e) => (this.viewH = e.target.valueAsNumber || 0)} />
    </Fragment>
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Transform)
  }

  getOriginPoint = () => ({ x: this.viewOX * this.viewW, y: this.viewOY * this.viewH })

  drawViewBorder (ctx) {
    if (!this.drawViewBorder) return
    ctx.strokeStyle = 'red'
    ctx.strokeRect(this.viewX, this.viewY, this.viewW, this.viewH)
  }

  drawCamPosition (ctx) {
    if (!this.renderCamPosition) return
    const transform = this.gameObject.getComponent(Transform)
    ctx.save()
    ctx.textBaseline = 'top'
    ctx.fillText(`Screen: { x: ${this.viewX}, y: ${this.viewY} }`, 0, 0)
    ctx.fillText(`Pos: { x: ${transform.x}, y: ${transform.y} }`, 0, parseInt(ctx.font, 10))
    ctx.restore()
  }

  attach (ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.rect(this.viewX, this.viewY, this.viewW, this.viewH)
    ctx.clip()

    this.drawViewBorder(ctx)

    const transform = this.gameObject.getComponent(Transform)

    ctx.translate(this.viewX, this.viewY)
    this.drawCamPosition(ctx)
    transform.apply(ctx)
  }

  detach (ctx) {
    ctx.restore()
  }

  worldPoint = (x, y) => {
    const { rotation, x: gX, y: gY, scale } = this.gameObject
    const op = this.getOriginPoint()
    let wx = (x - op.x) / scale
    let wy = (y - op.y) / scale

    const c = Math.cos(-rotation)
    const s = Math.sin(-rotation)
    wx = c * wx - s * wy
    wy = s * wx + c * wy

    return { x: wx + gX, y: wy + gY }
  }

  cameraPoint = (x, y) => {
    const { rotation, x: gX, y: gY, scale } = this.gameObject
    const c = Math.cos(rotation)
    const s = Math.sin(rotation)

    let cx = x - gX
    let cy = y - gY
    cx = c * cx - s * cy
    cy = s * cx + c * cy

    const op = this.getOriginPoint()
    return { x: (cx + op.x) * scale, y: (cy + op.y) * scale }
  }
}
