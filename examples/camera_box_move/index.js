import { h } from 'preact'
import { Component } from 'preact/compat'

import Game from './game'
import { clientEngine } from 'game_engine'

export default class Index extends Component {
  componentDidMount = () => {
    const canvas = this.canvas
    const game = new Game(canvas)
    clientEngine({ canvas, game, fps: 60 })
  }

  render = () => {
    return <div>
      <canvas ref={(node) => (this.canvas = node)} />
    </div>
  }
}
