import GameComponent from '../gameComponent'
import * as Matrix from 'transformation-matrix'
import * as React from 'preact'

export default class Transform extends GameComponent {
  constructor ({ x, y, sx, sy, r } = {}) {
    super('transform')

    this.x = x || 0
    this.y = y || 0
    this.rotation = r || 0
    this.scaleX = sx || 1
    this.scaleY = sy || 1

    this.updateMatrix()
  }

  setRotation (deg) {
    this.rotation = deg * Math.PI / 180
  }

  rotationInDeg = () => Math.round(this.rotation * 180 / Math.PI)

  getParentTransform () {
    if (this.gameObject) {
      const { parent } = this.gameObject
      if (parent) {
        const transform = parent.getComponent(Transform)
        if (transform) return transform
      }
    }

    return null
  }

  updateMatrix () {
    const parentTransform = this.getParentTransform()
    let matrix = Matrix.identity()
    if (parentTransform) matrix = parentTransform.matrix

    this.matrix = Matrix.transform(
      matrix,
      Matrix.translate(this.x, this.y),
      Matrix.rotate(this.rotation),
      Matrix.scale(this.scaleX, this.scaleY)
    )
  }

  translate (x, y) {
    this.matrix = Matrix.transform(
      this.matrix,
      Matrix.translate(x, y)
    )
    return this.matrix
  }

  editorRender = () => {
    return <React.Fragment>
      <label>X</label>
      <input type="number" value={this.x} step={1} onChange={(e) => (this.x = e.target.valueAsNumber)} />
      <label>Y</label>
      <input type="number" value={this.y} step={1} onChange={(e) => (this.y = e.target.valueAsNumber)} />
      <label>Scale X</label>
      <input type="number" value={this.scaleX} step={0.1} onChange={(e) => (this.scaleX = e.target.valueAsNumber)} />
      <label>Scale Y</label>
      <input type="number" value={this.scaleY} step={0.1} onChange={(e) => (this.scaleY = e.target.valueAsNumber)} />
      <label>Rotation [{this.rotationInDeg()}]</label>
      <input type="number" value={this.rotationInDeg()} step={1} min={-360} max={360} onChange={(e) => {
        this.setRotation(e.target.valueAsNumber)
      }} />
    </React.Fragment>
  }

  update () {
    this.updateMatrix()
  }
}
