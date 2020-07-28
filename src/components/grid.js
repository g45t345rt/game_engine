import GameComponent from '../gameComponent'
import Transform from './transform'
import Camera from './camera'

export default class Grid extends GameComponent {
  constructor () {
    super('grid')
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Camera)
  }

  render ({ ctx }) {
    const camera = this.gameObject.getComponent(Camera)

    const spaceUnit = 20
    const xLines = camera.viewH / spaceUnit
    const yLines = camera.viewW / spaceUnit

    ctx.save()
    ctx.translate(camera.viewX, camera.viewY)
    ctx.strokeStyle = 'black'

    for (var i = 0; i <= xLines; i++) {
      const line = i * spaceUnit
      ctx.beginPath()
      ctx.moveTo(0, line)
      ctx.lineTo(camera.viewW, line)
      ctx.stroke()
    }

    for (var i = 0; i <= yLines; i++) {
      const line = i * spaceUnit
      ctx.beginPath()
      ctx.moveTo(line, 0)
      ctx.lineTo(line, camera.viewH)
      ctx.stroke()
    }

    ctx.restore()
  }
}