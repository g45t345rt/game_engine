import GameComponent from '../gameComponent'
import Transform from './transform'

export default class Grid extends GameComponent {
  constructor ({ w, h, sw, sh }) {
    super('grid')

    this.width = w
    this.height = h
    this.spaceWidth = sw || 10
    this.spaceHeight = sh || 10
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Transform)
  }

  render ({ ctx }) {
    const transform = this.gameObject.getComponent(Transform)
    const xLines = this.width / this.spaceWidth
    const yLines = this.height / this.spaceHeight

    ctx.save()
    transform.apply(ctx)
    ctx.strokeStyle = 'black'
    ctx.globalAlpha = 0.3

    // horizontal
    for (let i = 0; i <= xLines; i++) {
      const line = i * this.spaceHeight
      ctx.beginPath()
      ctx.moveTo(0, line)
      ctx.lineTo(this.width, line)
      ctx.stroke()
    }

    // vertical
    for (let i = 0; i <= yLines; i++) {
      const line = i * this.spaceWidth
      ctx.beginPath()
      ctx.moveTo(line, 0)
      ctx.lineTo(line, this.height)
      ctx.stroke()
    }

    ctx.restore()
  }
}
