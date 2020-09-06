import { render as preactRender } from 'preact'
import Engine from './engine'
const WebSocket = require('isomorphic-ws')

export default class ClientEngine extends Engine {
  static #domRenderElement = null
  #animationFrame = null
  #lastTimestamp = 0
  constructor (GameClass, canvas, options = {}) {
    super(GameClass, options)

    // canvas and context2d
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
    window.addEventListener('resize', this.onResize)

    // websocket
    if (options.wsUrl) {
      this.ws = new WebSocket(options.wsUrl)
      this.ws.onopen = () => {
        console.log('connected')
        this.game.socket = this.ws
      }
    }
  }

  start () {
    super.start()

    if (!this.#animationFrame) this.#animationFrame = requestAnimationFrame(this.renderer.bind(this))

    this.domRenderer()
    if (this.ws) this.ws.addEventListener('message', this.dispatchDataFromServer)
  }

  stop () {
    super.stop()

    if (this.ws) this.ws.removeEventListener('message', this.dispatchDataFromServer)
  }

  dispatchDataFromServer (event) {
    this.game.dispatch('dataFromServer', event.data)
  }

  /*
  stop () {
    super.stop()

    if (this.#domRenderElement) {
      document.body.removeChild(this.#domRenderElement)
      this.#domRenderElement = null
    }

    if (this.#animationFrame) {
      cancelAnimationFrame(this.#animationFrame)
      this.#animationFrame = null
    }

    this.ctx = null
    window.removeEventListener('resize', this.onResize)
  }*/

  onResize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  domRenderer () {
    if (!ClientEngine.#domRenderElement) {
      ClientEngine.#domRenderElement = document.createElement('div')
      document.body.appendChild(ClientEngine.#domRenderElement)
    }

    const list = this.game.dispatch('domRender')
    preactRender(list, ClientEngine.#domRenderElement)
  }

  renderer (timestamp) {
    const { width, height } = this.canvas
    this.ctx.clearRect(0, 0, width, height)

    const deltaTime = timestamp - this.#lastTimestamp // DeltaTime is the completion time in milliseconds since the last frame

    const args = { ctx: this.ctx, deltaTime }
    this.game.dispatch('render', args)

    this.#lastTimestamp = timestamp
    this.#animationFrame = requestAnimationFrame(this.renderer.bind(this))
  }
}
