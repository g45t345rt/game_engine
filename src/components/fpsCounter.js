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
    return <React.Fragment>
      <label>fps</label>
      <span>{this.fps}</span>
    </React.Fragment>
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

  drawTextWithBackground (ctx, text) {

  }

  render ({ ctx, deltaTime }) {
    this.deltaTime = deltaTime
    ctx.save()
    ctx.font = '20px sans-serif'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'black'
    const width = ctx.measureText(this.fps).width
    ctx.fillRect(0, 0, width, parseInt(ctx.font, 10))
    ctx.fillStyle = 'white'
    ctx.fillText(this.fps, 0, 0)
    ctx.restore()
  }
}
