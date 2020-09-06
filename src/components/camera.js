import GameComponent from '../gameComponent'
import GameObject from '../gameObject'
import { h, Fragment } from 'preact'
import * as Matrix from 'transformation-matrix'

import Box from './box'
import Transform from './transform'

export default class Camera extends GameComponent {
  constructor ({ ref, vx, vy, vw, vh, vox, voy }) {
    super('camera')

    this.ref = ref
    //this.viewX = vx || 0
    //this.viewY = vy || 0
    //this.viewW = vw
    //this.viewH = vh
    //this.viewOX = vox || 0.5
    //this.viewOY = voy || 0.5
    this.drawCamPosition = true
  }

  editorRender = () => {
    return <Fragment>
      <label>Rendering</label>
      <span>{this.ref.displayName()}</span>
      <label>View Position</label>
      <div>
        <label>X</label>
        <input type='number' value={this.viewX} step={1} onChange={(e) => (this.viewX = e.target.valueAsNumber)} />
        <label>Y</label>
        <input type='number' value={this.viewY} step={1} onChange={(e) => (this.viewY = e.target.valueAsNumber)} />
      </div>
      <label>View Size</label>
      <div>
        <label>W</label>
        <input type='number' value={this.viewW} step={1} onChange={(e) => (this.viewW = e.target.valueAsNumber)} />
        <label>H</label>
        <input type='number' value={this.viewH} step={1} onChange={(e) => (this.viewH = e.target.valueAsNumber)} />
      </div>
    </Fragment>
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Box)
  }

  /*
  getOriginPoint = () => ({ x: this.viewOX * this.viewW, y: this.viewOY * this.viewH })

  drawViewBorder (ctx) {
    const box = this.gameObject.getComponent(Box)
    if (!this.drawViewBorder) return
    ctx.strokeStyle = 'red'
    ctx.strokeRect(0, 0, box.viewW, box.viewH)
  }*/

  #drawCamPosition (ctx) {
    if (!this.drawCamPosition) return
    const transform = this.gameObject.getComponent(Transform)
    ctx.save()
    ctx.textBaseline = 'top'
    ctx.font = '14px sans-serif'
    //ctx.fillText(`Screen: { x: ${this.viewX}, y: ${this.viewY} }`, 0, 0)
    ctx.fillText(transform.toString(), 0, parseInt(ctx.font, 10))
    ctx.restore()
  }

  preRender ({ ctx }) {
    return
    const transform = this.gameObject.getComponent(Transform)
    const box = this.gameObject.getComponent(Box)
    const { x, y } = transform
    const { width, height } = box

    this.#drawCamPosition()

    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.clip()
  }

  /*
  render (args) {
    return
    const { ctx } = args
    const box = this.gameObject.getComponent(Box)
    const { width, height } = box
    //this.attach(ctx)
    //ctx.translate(this.viewW, 0)
    //ctx.scale(-1, 1)

    //ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.clip()


    GameObject.sortRenderLogic(this.ref.gameObjects)
    this.ref.dispatch('render', args)
    //this.detach(ctx)

    //this.drawViewBorder(ctx)
    this.drawCamPosition(ctx)
  }

  attach (ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.rect(this.viewX, this.viewY, this.viewW, this.viewH)
    ctx.clip()

    //const transform = this.gameObject.getComponent(Transform)
    //ctx.translate(this.viewX, this.viewY)
    //transform.apply(ctx)
  }

  detach (ctx) {
    ctx.restore()

    ctx.save()
    this.drawViewBorder(ctx)
    ctx.translate(this.viewX, this.viewY)
    this.drawCamPosition(ctx)
    ctx.restore()
  }*/

  // world point
  refPoint = (screenX, screenY) => {
    const camTransform = this.gameObject.getComponent(Transform)
    const { x, y } = Matrix.applyToPoint(camTransform.matrix, { x: screenX, y: screenY })

    const refTransform = this.ref.getComponent(Transform)
    return Matrix.applyToPoint(refTransform.matrix, { x, y })

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

  screenPoint = (refX, refY) => {
    const refTransform = this.ref.getComponent(Transform)
    const { x, y } = Matrix.applyToPoint(refTransform.matrix, { x: refX, y: refY })

    const camTransform = this.gameObject.getComponent(Transform)
    return Matrix.applyToPoint(camTransform.matrix, { x, y })

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
