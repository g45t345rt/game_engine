import { h, Component } from 'preact'
import { clientEngine } from 'game_engine'
import Game from './game'

export default class Index extends Component {
  componentDidMount = () => {
    const game = new Game()
    clientEngine({ game, canvas: this.canvas })
  }

  render = () => {
    return <div>
      <canvas ref={(node) => (this.canvas = node)} />
    </div>
  }
}
