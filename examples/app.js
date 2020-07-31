import Router, { Link } from 'preact-router'
import { h, render } from 'preact'
import { Component } from 'preact/compat'

import 'normalize.css'

import CameraBoxMove from './camera_box_move'
import styles from './styles.module.css'

class Main extends Component {
  state = { showExamples: true }
  toggleExamples = () => {
    this.setState({ showExamples: !this.state.showExamples })
  }

  render = () => {
    return <div class={styles.page}>
      <div class={styles.top}>
        <div class={styles.relative}>
          <div class={styles.tab} onClick={this.toggleExamples}>Examples</div>
          {this.state.showExamples && <div class={styles.panel}>
            <ul class={styles.list}>
              <li><Link href='/camera_box_move'>Camera with box</Link></li>
            </ul>
          </div>}
        </div>
      </div>
      <div>
        <Router>
          <CameraBoxMove path='/camera_box_move' />
        </Router>
      </div>
    </div>
  }
}

render(<Main />, document.getElementById('root'))
