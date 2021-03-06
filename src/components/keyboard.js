import GameComponent from '../gameComponent'
import { h, Fragment } from 'preact'

export default class Keyboard extends GameComponent {
  static clientOnly = true

  constructor () {
    super('keyboard')
    this.keyPressed = {}
  }

  editorRender = () => {
    return <Fragment>
      <label>Key pressed</label>
      <span>{JSON.stringify(this.keyPressed, null, 2)}</span>
    </Fragment>
  }

  #registerEvents = () => {
    document.addEventListener('keydown', this.#registerKeyDown)
    document.addEventListener('keyup', this.#registerKeyUp)
    window.addEventListener('blur', this.#clearKeys)
    window.addEventListener('focus', this.#clearKeys)

    this.registered = true
  }

  #unRegisterEvents = () => {
    document.removeEventListener('keydown', this.#registerKeyDown)
    document.removeEventListener('keyup', this.#registerKeyUp)
    window.removeEventListener('blur', this.#clearKeys)
    window.removeEventListener('focus', this.#clearKeys)

    this.registered = false
  }

  #registerKeyDown = (e) => (this.enabled && (this.keyPressed[e.key] = true))

  #registerKeyUp = (e) => (delete this.keyPressed[e.key])

  #clearKeys = () => (this.keyPressed = {})

  isKeyDown = (key) => this.keyPressed[key]

  isEveryKeysDown = (keys) => keys.every((key) => this.keyPressed[key])

  isSomeKeysDown = (keys) => keys.some((key) => this.keyPressed[key])

  update () {
    if (this.enabled && !this.registered) this.#registerEvents()
    if (!this.enabled && this.registered) this.#unRegisterEvents()
  }
}
