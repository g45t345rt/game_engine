import GameComponent from '../gameComponent'

export default class DrawName extends GameComponent {
  constructor () {
    super('drawName')
  }

  render ({ ctx }) {
    ctx.font = '8px sans-serif'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.fillText(this.gameObject.displayName(), 0, 0)
  }
}
