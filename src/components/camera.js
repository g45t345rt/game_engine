import GameComponent from '../gameComponent'
import Transform from './transform'
import * as React from 'preact'

export default class Camera extends GameComponent {
  constructor ({ vx, vy, vw, vh, vox, voy }) {
    super('camera')

    this.viewX = vx || 0
    this.viewY = vy || 0
    this.viewW = vw
    this.viewH = vh
    this.viewOriginX = vox || 0.5
    this.viewOriginY = voy || 0.5
  }

  editorRender = () => {
    return <React.Fragment>
      <label>ViewX</label>
      <input type="number" value={this.viewX} onChange={(e) => (this.viewX = e.target.valueAsNumber || 0)} />
      <label>ViewY</label>
      <input type="number" value={this.viewY} onChange={(e) => (this.viewY = e.target.valueAsNumber || 0)} />
      <label>View Width</label>
      <input type="number" value={this.viewW} onChange={(e) => (this.viewW = e.target.valueAsNumber || 0)} />
      <label>View Height</label>
      <input type="number" value={this.viewH} onChange={(e) => (this.viewH = e.target.valueAsNumber || 0)} />
    </React.Fragment>
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Transform)
  }

  getOriginPoint = () => new DOMPoint(this.viewOriginX * this.viewW, this.viewOriginX * this.viewH)

  drawViewBorder (ctx) {
    if (!this.drawViewBorder) return
    ctx.strokeStyle = 'red'
    ctx.strokeRect(this.viewX, this.viewY, this.viewW, this.viewH)
  }

  render ({ ctx }) {
    ctx.beginPath()
    ctx.rect(this.viewX, this.viewY, this.viewW, this.viewH)
    ctx.clip()

    this.drawViewBorder(ctx)
    ctx.translate(this.viewX, this.viewY)
  }

  worldPoint = (x, y) => {
    const { rotation, x: gX, y: gY, scale } = this.gameObject
    const originPoint = this.getOriginPoint()
    let wx = (x - originPoint.x) / scale
    let wy = (y - originPoint.y) / scale

    const c = Math.cos(-rotation)
    const s = Math.sin(-rotation)
    wx = c * wx - s * wy
    wy = s * wx + c * wy

    return new DOMPoint(wx + gX, wy + gY)
  }

  cameraPoint = (x, y) => {
    const { rotation, x: gX, y: gY, scale } = this.gameObject
    const c = Math.cos(rotation)
    const s = Math.sin(rotation)

    let cx = x - gX
    let cy = y - gY
    cx = c * cx - s * cy
    cy = s * cx + c * cy

    const originPoint = this.getOriginPoint()
    return new DOMPoint((cx + originPoint.x) * scale, (cy + originPoint.y) * scale)
  }
}
