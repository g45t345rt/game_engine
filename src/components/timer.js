import { h, Fragment } from 'preact'
import GameComponent from '../gameComponent'

class Timer {
  constructor ({ key, stopAt, autoStart }) {
    this.key = key
    this.stopAt = stopAt

    this.canStart = false
    if (autoStart) this.canStart = true

    this.elapsed = 0
  }

  stop = () => (this.stopped = true)
  resume = () => (this.stopped = false)
  started = () => this.canStart

  startOrReset () {
    this.elapsed = 0
    this.stopped = false
    this.canStart = true
  }

  update ({ deltaTime }) {
    if (!this.canStart) return

    if (this.elapsed >= this.stopAt) return this.stop()
    this.elapsed += deltaTime
  }
}

export default class Timers extends GameComponent {
  constructor (timers = []) {
    super('timers')
    this.timers = timers.map((props) => new Timer(props))
  }

  editorRender = () => {
    if (!this.selectedTimer) this.selectedTimer = this.timers.length > 0 ? this.selectedTimer = this.timers[0] : null

    return <Fragment>
      <label>Timers</label>
      <select value={this.selectedTimer ? this.selectedTimer.key : ''} onChange={(e) => (this.selectedTimer = this.timers.find((timer) => timer.key === e.target.value))}>
        {this.timers.map(({ key }) => (<option key={key} value={key}>{key}</option>))}
      </select>
      {this.selectedTimer && <Fragment>
        <label>Properties</label>
        <span>{JSON.stringify(this.selectedTimer)}</span>
      </Fragment>}
    </Fragment>
  }

  get (key, props) {
    let timer = this.timers.find((timer) => timer.key === key)
    if (!timer) {
      // if it does not exist create a new timer
      timer = new Timer({ key, ...props })
      this.timers.push(timer)
    }

    return timer
  }

  update (args) {
    this.timers.forEach((timer) => timer.update(args))
  }
}
