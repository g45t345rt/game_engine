import { render as preactRender } from 'preact'
import engine from './engine'

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

  preactRender(game.__domRender(), element)

  const render = (timestamp) => {
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    const deltaTime = timestamp - lastTimestamp // DeltaTime is the completion time in milliseconds since the last frame

    game.__render({ ctx, deltaTime })
    lastTimestamp = timestamp

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

export default clientEngine
