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
