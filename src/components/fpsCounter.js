import GameComponent from '../gameComponent'
import * as React from 'preact'

export default class FpsCounter extends GameComponent {
  constructor () {
    super('fpsCounter')

    this.fps = 0

    this.count = 0
    this.timestamp = 0
    this.deltaTime = 0
  }

  editorRender = () => {
    return [
      <label>fps</label>,
      <span>{this.fps}</span>,
    ]
  }

  update () {
    this.timestamp = this.timestamp + this.deltaTime
    this.count += 1

    if (this.timestamp >= 1000) {
      this.fps = this.count
      this.count = 0
      this.timestamp = 0
    }
  }

  render ({ ctx, deltaTime }) {
    this.deltaTime = deltaTime
    ctx.save()
    ctx.font = '18px sans-serif'
    ctx.textBaseline = 'top'
    ctx.fillText(this.fps, 0, 0)
    ctx.restore()
  }
}
