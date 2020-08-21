import { h } from 'preact'
import { Component } from 'preact/compat'

import { ClientEngine } from 'game_engine'

export default class Index extends Component {
  componentDidMount = () => {
    const { game } = this.props

    const { clientEngine } = this.state
    if (!clientEngine) {
      const newClientEngine = new ClientEngine(game, this.canvas, { wsUrl: 'ws://localhost:8080' })
      this.setState({ clientEngine: newClientEngine })
      newClientEngine.start()
    } else {
      clientEngine.start()
    }
  }

  componentWillUnmount () {
    const { clientEngine } = this.state
    clientEngine.stop()
  }

  render = () => {
    return <div>
      <canvas ref={(node) => (this.canvas = node)} />
    </div>
  }
}
