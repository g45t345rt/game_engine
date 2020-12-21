import FpsCounter from './fpsCounter'
import { typeBoolOrDefault, typeNumberOrDefault, typeObject } from './typeCheck'

export class Renderer extends EventTarget {
  #lastRender = 0
  #animationFrame = null
  constructor (options = {}) {
    super()

    this.root = typeObject(options.root)

    this.canvas = document.createElement('canvas')
    this.canvas.style.display = 'block' // fix overflow -- canvas use display: inline
    this.ctx = this.canvas.getContext('2d')

    this.fpsCounter = new FpsCounter()

    this.width = typeNumberOrDefault(options.w, window.innerWidth)
    this.height = typeNumberOrDefault(options.h, window.innerHeight)
    this.windowResize = typeBoolOrDefault(options.windowResize, true)

    this.resizeCanvas()

    window.addEventListener('resize', () => {
      if (this.windowResize) {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.resizeCanvas()
      }
    })
  }

  resizeCanvas () {
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  start () {
    requestAnimationFrame(this.#render.bind(this))
  }

  stop () {
    cancelAnimationFrame(this.#animationFrame)
  }

  #render (timestamp) {
    const { ctx, canvas } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const deltaTime = timestamp - this.#lastRender
    this.fpsCounter.update(deltaTime)

    const args = { ctx, timestamp, deltaTime, fps: this.fpsCounter.fps }
    this.root._draw(args)
    this.dispatchEvent(new Event('render', args))

    this.#lastRender = timestamp
    this.#animationFrame = requestAnimationFrame(this.#render.bind(this))
  }
}

export default Renderer