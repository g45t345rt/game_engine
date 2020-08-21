import { render as preactRender } from 'preact'
import GameObject from './gameObject'
import Engine from './engine'
const WebSocket = require('isomorphic-ws')

export default class ClientEngine extends Engine {
  #domRenderElement = null
  #animationFrame = null
  #lastTimestamp = 0
  constructor (game, canvas, options = {}) {
    super(game, options)
    this.canvas = canvas
    this.wsUrl = options.wsUrl || null
  }

  start () {
    if (!this.#animationFrame) this.#animationFrame = requestAnimationFrame(this.renderer.bind(this))

    this.domRenderer()

    if (!this.ctx) {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.ctx = this.canvas.getContext('2d')
      window.addEventListener('resize', this.onResize)
    }

    if (!this.ws && this.wsUrl) {
      this.ws = new WebSocket(this.wsUrl)
      this.ws.onopen = () => {
        console.log('connected')
        this.game.socket = this.ws
      }

      this.ws.addEventListener('message', (event) => this.game.dispatch('dataFromServer', event.data))
    }

    super.start()
  }

  stop () {
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

    super.stop()
  }

  onResize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  sortRenderLogic = (list) => {
    list.sort((r1, r2) => r1.index - r2.index)

    // sorting render layers
    list.sort((r1, r2) => {
      return GameObject.layers.indexOf(r1.layer) - GameObject.layers.indexOf(r2.layer)
    })
  }

  domRenderer () {
    this.#domRenderElement = document.createElement('div')
    document.body.appendChild(this.#domRenderElement)

    const list = this.game.dispatch('domRender')
    preactRender(list, this.#domRenderElement)
  }

  renderer (timestamp) {
    const { width, height } = this.canvas
    this.ctx.clearRect(0, 0, width, height)

    const deltaTime = timestamp - this.#lastTimestamp // DeltaTime is the completion time in milliseconds since the last frame

    const args = { ctx: this.ctx, deltaTime }

    // Get renderable points gameobjects
    const gameObjects = this.game.findGameObjects((go) => {
      return go.renderPointer !== null
    })

    if (this.game.renderPointer !== null) gameObjects.push(this.game)

    this.sortRenderLogic(gameObjects)

    gameObjects.forEach((go) => {
      const { renderPointer } = go
      const childs = renderPointer.findGameObjects()
      go.dispatch('preRender', args)
      go.dispatch('render', args)
      this.sortRenderLogic(childs)
      childs.forEach((child) => {
        child.dispatch('render', args)
      })
      go.dispatch('postRender', args)
    })

    this.#lastTimestamp = timestamp
    this.#animationFrame = requestAnimationFrame(this.renderer.bind(this))
  }
}
