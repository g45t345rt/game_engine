import Router, { Link } from 'preact-router'
import { h, render } from 'preact'
import { Component } from 'preact/compat'

import 'normalize.css'

import CameraBoxMove from './camera_box_move'
import MultipleCamera from './multiple_camera'
import SetPathBoat from './set_path_boat'
import styles from './styles.module.css'

class Main extends Component {
  state = { showExamples: true }
  toggleExamples = () => {
    this.setState({ showExamples: !this.state.showExamples })
  }

  render = () => {
    return <div>
      <div class={styles.top}>
        <div class={styles.relative}>
          <div class={styles.tab} onClick={this.toggleExamples}>Examples</div>
          {this.state.showExamples && <div class={styles.panel}>
            <ul class={styles.list}>
              <li><Link href='/camera_box_move'>Camera with box</Link></li>
              <li><Link href='/multiple_camera'>Multiple camera</Link></li>
              <li><Link href='/set_path_boat'>Set path boat</Link></li>
            </ul>
          </div>}
        </div>
      </div>
      <div>
        <Router>
          <SetPathBoat path='/set_path_boat' />
          <CameraBoxMove path='/camera_box_move' />
          <MultipleCamera path='/multiple_camera' />
        </Router>
      </div>
    </div>
  }
}

render(<Main />, document.getElementById('root'))
