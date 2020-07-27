import Engine from './engine'
import * as React from 'preact'

export default class ClientEngine extends Engine {
  constructor ({ canvas, game, fps, domRootId }) {
    super({ game, fps })

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    requestAnimationFrame(this.render.bind(this))

    document.body.style = 'overflow:hidden'

    // get all domReact from components
    // render with preact
    React.render(game.domRender(), document.getElementById(domRootId))
  }

  render (timestamp) {
    const { width, height } = this.canvas
    this.ctx.clearRect(0, 0, width, height)

    const deltaTime = timestamp - this.lastTimestamp // DeltaTime is the completion time in milliseconds since the last frame
    this.game.__render({ ctx: this.ctx, deltaTime })
    this.lastTimestamp = timestamp

    requestAnimationFrame(this.render.bind(this))
  }
}
