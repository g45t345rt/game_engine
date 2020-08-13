import { render as preactRender } from 'preact'
import engine from './engine'
import GameObject from './gameObject'

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
  let element = document.getElementById('editor')
  if (!element) {
    element = document.createElement('div')
    element.id = 'editor'
    document.body.appendChild(element)
  }

  preactRender(game.dispatch('domRender'), element)

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
