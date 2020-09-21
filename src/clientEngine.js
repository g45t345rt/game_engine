import { h, render as preactRender } from 'preact'
import Engine from './engine'
import Editor from './editor'

const WebSocket = require('isomorphic-ws')

export default class ClientEngine extends Engine {
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
      }

      this.game.socket = this.ws
    }

    // editor
    this.showEditor = true
    if (options.showEditor) this.showEditor = options.showEditor

    this.renderEditor()
  }

  start () {
    super.start()

    if (!this.#animationFrame) this.#animationFrame = requestAnimationFrame(this.renderer.bind(this))
    if (this.ws) this.ws.addEventListener('message', this.dispatchDataFromServer)
  }

  stop () {
    super.stop()

    if (this.ws) this.ws.removeEventListener('message', this.dispatchDataFromServer)
  }

  clear () {
    this.stop()

    if (this.#animationFrame) {
      cancelAnimationFrame(this.#animationFrame)
      this.#animationFrame = null
    }

    window.removeEventListener('resize', this.onResize)
  }

  dispatchDataFromServer = (event) => {
    this.game.dispatch('dataFromServer', event.data)
  }

  onResize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  renderEditor () {
    if (!this.showEditor) return
    let div = document.getElementById('editor')
    if (div) document.body.removeChild(div)
    div = document.createElement('div')
    div.id = 'editor'
    document.body.appendChild(div)

    preactRender(<Editor key={this.game.key} ref={(node) => {
      setInterval(node.forceUpdate.bind(node), 1000 / 10)
    }} game={this.game} />, div)
  }

  renderer (timestamp) {
    const { width, height } = this.canvas
    this.ctx.clearRect(0, 0, width, height)

    const deltaTime = timestamp - this.#lastTimestamp // DeltaTime is the completion time in milliseconds since the last frame

    //const args = { ctx: this.ctx, deltaTime }
    this.game.dispatch('render', {
      ctx: this.ctx,
      deltaTime,
      pre: ({ explicitRender }) => {
        if (explicitRender) return false
        this.ctx.save()
        return true
      },
      post: () => { this.ctx.restore() }
    })
    //if (this.editorDom) setTimeout(this.editorDom.forceUpdate, 1000)

    this.#lastTimestamp = timestamp
    this.#animationFrame = requestAnimationFrame(this.renderer.bind(this))
  }
}
