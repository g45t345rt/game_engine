import { h } from 'preact'
import { Component } from 'preact/compat'

import { clientEngine } from 'game_engine'
import Game from './game'

export default class Index extends Component {
  componentDidMount () {
    const canvas = this.canvas
    const game = new Game(canvas)
    clientEngine({ canvas, game, fps: 60, domRootId: 'editor' })
  }

  render = () => {
    return <div>
      <div id='editor' />
      <canvas ref={(node) => (this.canvas = node)} />
    </div>
  }
}
