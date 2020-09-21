import { h, Fragment } from 'preact'
import GameComponent from '../gameComponent'

export default class Sprite extends GameComponent {
  constructor ({ frames, fps, playType, startIndex }) {
    super('sprite')

    this.playType = playType || 'once' // loop, once, none, (if number we loop for that much)
    this.frames = frames
    this.fps = fps || 1
    this.index = startIndex || 0
    this.timer = 0
    this.stop = false
  }

  update ({ deltaTime }) {
    if (this.stop) return

    this.timer += deltaTime
    const ms = 1000 / this.fps
    if (this.timer > ms) {
      this.timer = 0
      if (this.index === this.frames.length - 1) {
        this.index = 0
      } else {
        this.index++
      }
    }
  }

  render ({ ctx }) {
    const frame = this.frames[this.index]
    ctx.translate(-frame.width / 2, -frame.height / 2)
    ctx.drawImage(frame, 0, 0)
  }

  editorRender = () => {
    return <Fragment>
      <div>
        <button onClick={() => {
          this.timer = 0
          this.stop = !this.stop
        }}>{this.stop ? 'start' : 'stop'}</button>
        <button onClick={() => {
          this.timer = 0
          this.index = this.startIndex || 0
          this.stop = false
        }}>Restart</button>
      </div>
      <label>Play type</label>
      <select>
        <option>Once</option>
        <option>Loop</option>
        <option>Specific</option>
        <option>None</option>
      </select>
      <label>Frame per seconds</label>
      <input type='number' value={this.fps} onChange={(e) => (this.fps = e.target.valueAsNumber)} />
      <label>Frames</label>
      <span>{this.index} / {this.frames.length}</span>
    </Fragment>
  }
}
