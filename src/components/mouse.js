import { h, Fragment } from 'preact'
import GameComponent from '../gameComponent'

export default class Mouse extends GameComponent {
  type = 'client'

  constructor () {
    super('mouse')
  }

  editorRender = () => {
    return <Fragment>
      <div>
        <label>MouseX</label>
        <span>{this.x}</span>
        <label>MouseY</label>
        <span>{this.y}</span>
        <label>MouseDown</label>
        <input type='checkbox' checked={this.isDown} disabled />
      </div>
    </Fragment>
  }

  onAdd = () => {
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mousedown', this.mouseDown)
    document.addEventListener('mouseup', this.mouseUp)
  }

  onRemove = () => {
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mousedown', this.mouseDown)
    document.removeEventListener('mouseup', this.mouseUp)
  }

  mouseDown = () => {
    this.isDown = true
  }

  mouseUp = () => {
    this.isDown = false
  }

  mouseMove = (e) => {
    this.x = e.clientX
    this.y = e.clientY
  }
}
