import Router from 'preact-router'
import { Link } from 'preact-router/match'
import { h, render } from 'preact'
import { Component } from 'preact/compat'

import 'normalize.css'

import CameraBoxMove from './camera_box_move/game'
import MultipleCamera from './multiple_camera/game'
import Path2dDrawBoat from './path2d_draw_boat/game'
import networkMove from './network_move'
import Rocks from './rocks/game'

import NoGame from './no_game'

import App from './presets/app'

import styles from './styles.module.css'

class Main extends Component {
  state = { showExamples: true }

  componentDidMount () {
    document.body.style = 'overflow: hidden'
  }

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
              <li><Link activeClassName={styles.active} href='/camera_box_move'>Camera with box</Link></li>
              <li><Link activeClassName={styles.active} href='/multiple_camera'>Multiple camera</Link></li>
              <li><Link activeClassName={styles.active} href='/path2d_draw_boat'>Path2D draw boat</Link></li>
              <li><Link activeClassName={styles.active} href='/network_move'>Network move</Link></li>
              <li><Link activeClassName={styles.active} href='/rocks'>Rocks</Link></li>
            </ul>
          </div>}
        </div>
      </div>
      <div>
        <Router>
          <App key='camera_box_move' path='/camera_box_move' gameClass={CameraBoxMove} />
          <App key='multiple_camera' path='/multiple_camera' gameClass={MultipleCamera} />
          <App key='path2d_draw_boat' path='/path2d_draw_boat' gameClass={Path2dDrawBoat} />
          <App key='network_move' path='/network_move' game={networkMove} options={{ wsUrl: 'http://localhost:8080' }} />
          <App key='car_dodge' path='/rocks' gameClass={Rocks} />
          <NoGame path='/no_game' />
        </Router>
      </div>
    </div>
  }
}

render(<Main />, document.getElementById('root'))
