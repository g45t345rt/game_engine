import GameComponent from '../gameComponent'
import { h, Fragment } from 'preact'
import Transform from './transform'

export default class FpsCounter extends GameComponent {
  static clientOnly = true

  constructor () {
    super('fpsCounter')

    this.fps = 0

    this.count = 0
    this.timestamp = 0
    this.deltaTime = 0
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Transform)
  }

  editorRender = () => {
    return <Fragment>
      <label>fps</label>
      <span>{this.fps}</span>
    </Fragment>
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
    const transform = this.gameObject.getComponent(Transform)
    this.deltaTime = deltaTime
    ctx.save()
    transform.apply(ctx)
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
