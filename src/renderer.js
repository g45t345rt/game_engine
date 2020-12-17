import { typeBoolOrDefault, typeNumberOrDefault } from "./typeCheck"

/*
export function render (root, cb) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  let deltaTime = 0
  let lastTime = performance.now()
  const render = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const args = { ctx, timestamp, deltaTime }
    root._update(args)
    root._draw(args)
    if (typeof cb === 'function') cb(args)

    deltaTime = timestamp - lastTime
    lastTime = timestamp
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
  document.body.append(canvas)
}

export default render
*/

export class Renderer extends EventTarget {
  constructor (options = {}) {
    super()

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.width = typeNumberOrDefault(options.w, window.innerWidth)
    this.height = typeNumberOrDefault(options.h, window.innerHeight)
    this.resizeCanvas()

    this.windowResize = typeBoolOrDefault(options.windowResize, true)
    this.clearRect = typeBoolOrDefault(options.clearRect, true)

    window.addEventListener('resize', () => {
      if (this.windowResize) {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.resizeCanvas()
      }
    })

    document.body.append(this.canvas)
  }

  resizeCanvas () {
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  #deltaTime = 0
  #lastTime = performance.now()
  _render (timestamp) {
    const { ctx, canvas, root } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const args = { ctx, timestamp, deltaTime: this.#deltaTime }
    root._update(args)
    root._draw(args)

    this.dispatchEvent(new Event('render', args))

    this.#deltaTime = timestamp - this.#lastTime
    this.#lastTime = timestamp
    requestAnimationFrame(this._render.bind(this))
  }

  render (root) {
    this.root = root
    requestAnimationFrame(this._render.bind(this))
  }
}

export default Renderer