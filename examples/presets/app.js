import { h } from 'preact'
import { Component } from 'preact/compat'

import { ClientEngine } from 'game_engine'

export default class Index extends Component {
  componentDidMount = () => {
    const { gameClass, options } = this.props
    const clientEngine = new ClientEngine(gameClass, this.canvas, options)
    clientEngine.start()
    this.setState({ clientEngine })
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
