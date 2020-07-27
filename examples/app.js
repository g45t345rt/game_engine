import Router, { Link } from 'preact-router'
import * as React from 'preact'

import 'normalize.css'

import CameraBoxMove from './camera_box_move'
import styles from './styles.module.css'

const Main = () => (
  <div className={styles.page}>
    <div className={styles.panel}>
      <div className={styles.tab}>Menu</div>
      <ul className={styles.list}>
        <li><Link href="/camera_box_move">Camera with box</Link></li>
      </ul>
    </div>
    <div>
      <Router>
        <CameraBoxMove path="/camera_box_move" />
      </Router>
    </div>
  </div>
)

React.render(<Main />, document.getElementById('root'))
