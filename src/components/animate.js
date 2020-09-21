import { h, Fragment } from 'preact'
import shortid from 'shortid'

import GameComponent from '../gameComponent'
import Easing from '../misc/easing'

export class Animation {
  constructor ({ name, delay, duration, easing, values, targets, autoStart, onFinish }) {
    this.name = name || shortid.generate()
    this.delay = delay || 0
    this.duration = duration || 1000
    this.easing = easing || Easing.linear
    this.values = values
    this.targets = targets
    this.onFinish = onFinish

    this.canPlay = true
    if (autoStart === false) this.canPlay = false

    this.isDone = false

    this.delayTime = 0
    this.elapsedTime = 0
  }

  resume = () => {
    this.canPlay = true
  }

  pause = () => {
    this.canPlay = false
  }

  toggle = () => {
    if (this.canPlay) this.pause()
    else this.start()
  }

  play = () => {
    this.reset()
    this.resume()
  }

  reset = () => {
    this.delayTime = 0
    this.elapsedTime = 0
    this.isDone = false
  }

  update ({ deltaTime }) {
    if (!this.canPlay || this.isDone) return

    if (this.elapsedTime >= this.duration) {
      // Animation is done
      this.canPlay = false
      this.isDone = true
      if (this.onFinish && typeof this.onFinish === 'function') this.onFinish()
      return
    }

    this.delayTime += deltaTime
    if (this.delayTime <= this.delay) return

    if (!this.startTargets) this.startTargets = this.targets.map((t) => ({ ...t }))

    this.elapsedTime += deltaTime
    const amount = this.elapsedTime / this.duration

    for (let i = 0; i < this.values.length; i++) {
      if (typeof this.values[i] === 'function') this.values[i] = this.values[i]()
      Object.keys(this.values[i]).forEach((key) => {
        const value = this.values[i][key]
        const start = this.startTargets[i][key]
        this.targets[i][key] = start + (value - start) * this.easing(amount)
      })
    }
  }
}

export default class Animate extends GameComponent {
  constructor (animations) {
    super('animate')
    this.animations = animations.map((props) => new Animation(props))
    this.selected = 0
  }

  get (name) {
    return this.animations.find((anim) => anim.name === name)
  }

  editorRender = () => {
    const anim = this.animations[this.selected]
    const { name, targets, canPlay, toggle, reset, duration, delay, autoStart, elapsedTime, delayTime } = anim
    return <Fragment>
      <label>Animations</label>
      <select value={name} onChange={(e) => (this.selected = this.animations.findIndex(({ name }) => name === e.target.value))}>
        {this.animations.map(({ name }) => (<option value={name} key={name}>{name}</option>))}
      </select>
      <label>Controls</label>
      <div>
        <button onClick={() => toggle()}>{canPlay ? 'stop' : 'play'}</button>
        <button onClick={() => reset()}>reset</button>
        <div>
          <label>Autostart</label>
          <input type='checkbox' value={autoStart} onChange={(e) => (anim.autoStart = e.target.checked)} />
        </div>
      </div>
      <label>Easing</label>
      <select>
        {Object.keys(Easing).map((key) => (<option key={key} value={key}>{key}</option>))}
      </select>
      <div>
        <label>Delay</label>
        <input type='text' value={delay} onChange={(e) => (anim.delay = e.target.valueAsNumber)} />
        <label>Duration</label>
        <input type='text' value={duration} onChange={(e) => (anim.duration = e.target.valueAsNumber)} />
      </div>
      <label>Targets</label>
      {targets.forEach((target) => { })}
      <label>Info</label>
      <span>{JSON.stringify({ elapsedTime, delayTime })}</span>
    </Fragment >
  }

  update (args) {
    this.animations.forEach((animation) => animation.update(args))
  }
}
