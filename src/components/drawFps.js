import { typeNumberOrDefault } from '../typeCheck'
import Component from './component'
import Transform from './transform'

export default class DrawFPS extends Component {
  constructor (options) {
    super(options)
    this.padding = typeNumberOrDefault(options.padding, 5)
    this.fps = 0
    this.frames = 0
    this.elapsed = 0
  }

  init () {
    this.requiredComponent(Transform)
  }

  update ({ deltaTime }) {
    if (this.elapsed > 1000) {
      this.elapsed = 0
      this.fps = this.frames
      this.frames = 0
    }

    this.frames++
    this.elapsed += deltaTime
  }

  draw ({ ctx }) {
    const text = `${this.fps} FPS`

    ctx.font = 'bold 14px arial'

    const h = ctx.measureText('M').width // https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
    const w = ctx.measureText(text).width
    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 0, w + (this.padding * 2), h + (this.padding * 2))

    ctx.fillStyle = 'white'
    ctx.textBaseline = 'top'
    ctx.fillText(text, this.padding, this.padding)
  }
}
