import { render as preactRender } from 'preact'
import GameObject from './gameObject'
import Engine from './engine'

/*
const clientEngine = ({ game, canvas, fps = 60 }) => {
  engine({ game, fps })

  let lastTimestamp = 0
  const ctx = canvas.getContext('2d')

  document.body.style = 'overflow:hidden'

  // Resize canvas to window width
  const onResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener('resize', onResize)
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Render editor
  const editorElement = document.getElementById('editor')
  if (editorElement) document.body.removeChild(editorElement)

  const newEditorElement = document.createElement('div')
  newEditorElement.id = 'editor'
  document.body.appendChild(newEditorElement)

  preactRender(game.dispatch('domRender'), newEditorElement)

  const sortRenderLogic = (list) => {
    list.sort((r1, r2) => r1.index - r2.index)

    // sorting render layers
    list.sort((r1, r2) => {
      return GameObject.layers.indexOf(r1.layer) - GameObject.layers.indexOf(r2.layer)
    })
  }

  const render = (timestamp) => {
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    const deltaTime = timestamp - lastTimestamp // DeltaTime is the completion time in milliseconds since the last frame

    const args = { ctx, deltaTime }

    // Get renderable points gameobjects
    const gameObjects = game.findGameObjects((go) => {
      return go.renderPointer !== null
    })

    if (game.renderPointer !== null) gameObjects.push(game)

    sortRenderLogic(gameObjects)

    gameObjects.forEach((go) => {
      const { renderPointer } = go
      const childs = renderPointer.findGameObjects()
      go.dispatch('preRender', args)
      go.dispatch('render', args)
      sortRenderLogic(childs)
      childs.forEach((child) => {
        child.dispatch('render', args)
      })
      go.dispatch('postRender', args)
    })

    lastTimestamp = timestamp

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

export default clientEngine
*/

export default class ClientEngine extends Engine {
  #domRenderElement = null
  #animationFrame = null
  #lastTimestamp = 0
  constructor (game, canvas, options) {
    super(game, options)
    this.canvas = canvas
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
