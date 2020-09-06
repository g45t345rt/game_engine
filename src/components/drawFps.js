import GameComponent from '../gameComponent'
import { h, Fragment } from 'preact'
import Transform from './transform'

export default class DrawFps extends GameComponent {
  static clientOnly = true

  constructor () {
    super('drawFps')

    this.fps = 0

    this.count = 0
    this.timestamp = 0
    this.deltaTime = 0
  }

  onAdd = () => {
    //this.gameObject.requiredComponent(Transform)
  }

  editorRender = () => {
    return <Fragment>
      <label>fps</label>
      <span>{this.fps}</span>
    </Fragment>
  }

  render ({ ctx, deltaTime }) {
    //const transform = this.gameObject.getComponent(Transform)

    this.timestamp = this.timestamp + deltaTime
    this.count++
    if (this.timestamp >= 1000) {
      this.fps = this.count
      this.count = 0
      this.timestamp = 0
    }

    //ctx.save()
    //transform.apply(ctx)
    ctx.font = '20px sans-serif'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'black'
    const width = ctx.measureText(this.fps).width
    const height = ctx.measureText('M').width // close approximation of the vertical height by checking the length of a capital M
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = 'white'
    ctx.fillText(this.fps, 0, 0)
    //ctx.restore()
  }
}
