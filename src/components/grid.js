import { h, Fragment } from 'preact'
import GameComponent from '../gameComponent'
import Transform from './transform'

export default class Grid extends GameComponent {
  constructor ({ width, height, spacing }) {
    super('grid')

    this.width = width
    this.height = height
    this.spacing = spacing || 10
  }

  onAdd = () => {
    //this.gameObject.requiredComponent(Transform)
  }

  editorRender = () => {
    return <Fragment>
      <label>Size</label>
      <div>
        <label>W</label>
        <input type='number' value={this.width} step={1} onChange={(e) => (this.width = e.target.valueAsNumber)} />
        <label>H</label>
        <input type='number' value={this.height} step={1} onChange={(e) => (this.height = e.target.valueAsNumber)} />
      </div>
      <label>Spacing</label>
      <input type='number' value={this.spacing} step={1} onChange={(e) => (this.spacing = e.target.valueAsNumber)} />
    </Fragment>
  }

  render ({ ctx }) {
    //const transform = this.gameObject.getComponent(Transform)
    const xLines = this.width / this.spacing
    const yLines = this.height / this.spacing

    ctx.save()
    ctx.strokeStyle = 'black'
    ctx.globalAlpha = 0.3

    // horizontal
    for (let i = 0; i <= xLines; i++) {
      const line = i * this.spacing
      ctx.beginPath()
      ctx.moveTo(0, line)
      ctx.lineTo(this.width, line)
      ctx.stroke()
    }

    // vertical
    for (let i = 0; i <= yLines; i++) {
      const line = i * this.spacing
      ctx.beginPath()
      ctx.moveTo(line, 0)
      ctx.lineTo(line, this.height)
      ctx.stroke()
    }

    ctx.restore()
  }
}
