import { typeNumberOrDefault } from '../typeCheck'
import Transform from './transform'
import Component from '../component'

export class DrawFPS extends Component {
  constructor (options) {
    super(options)
    this.padding = typeNumberOrDefault(options.padding, 5)
  }

  init () {
    this.requiredComponent(Transform)
  }

  draw ({ ctx, fps }) {
    const text = `${fps} FPS`

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

export default DrawFPS