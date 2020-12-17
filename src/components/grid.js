import { typeNumber, typeNumberOrDefault, typeStringOrDefault } from '../typeCheck'
import Rect from './rect'
import Component from '../component'

export class Grid extends Component {
  constructor (options) {
    super(options)

    this.sw = typeNumber(options.sw) // width spacing
    this.sh = typeNumber(options.sh) // heigh spacing
    this.opacity = typeNumberOrDefault(options.opacity, 0.3)
    this.lineColor = typeStringOrDefault(options.lineColor, 'black')
  }

  draw ({ ctx }) {
    const { w, h } = this.getComponent(Rect)
    const xLines = w / this.sw
    const yLines = h / this.sh

    ctx.save()
    ctx.strokeStyle = this.lineColor
    ctx.globalAlpha = this.opacity

    // horizontal
    for (let i = 0; i <= xLines; i++) {
      const line = i * this.sh
      ctx.beginPath()
      ctx.moveTo(0, line)
      ctx.lineTo(w, line)
      ctx.stroke()
    }

    // vertical
    for (let i = 0; i <= yLines; i++) {
      const line = i * this.sw
      ctx.beginPath()
      ctx.moveTo(line, 0)
      ctx.lineTo(line, h)
      ctx.stroke()
    }

    ctx.restore()
  }
}