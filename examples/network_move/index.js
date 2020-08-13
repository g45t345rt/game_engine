import { h, Component } from 'preact'
import { clientEngine } from 'game_engine'

import Game from './game'

export default class Index extends Component {
  componentDidMount () {
    const canvas = this.canvas
    const game = new Game()
    clientEngine({ game, canvas, wsUrl: 'ws://localhost:8080' })
  }

  render () {
    return <div>
      <canvas ref={(node) => (this.canvas = node)} />
    </div>
  }
}
