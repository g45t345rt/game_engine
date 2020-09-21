import { h } from 'preact'
import { Component } from 'preact/compat'

export default class Index extends Component {
  componentDidMount = () => {
    const ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    const offcanvas = new OffscreenCanvas(50, 40)
    const offctx = offcanvas.getContext('2d')
    offctx.fillStyle = '#5f7e80'
    offctx.fill(new Path2D('M44,12.16A2,2,0,0,1,44,13.61L36.08,32l-.85.95L34,33.16,17,30.71l-6.65,5a2.07,2.07,0,0,1-1.4.4,1.74,1.74,0,0,1-1.25-.65L.53,27.56a1.63,1.63,0,0,1-.5-1,2,2,0,0,1,.15-1.2l6.6-13.2.6-.65,14.3-11A1.72,1.72,0,0,1,22.73,0a2,2,0,0,1,1.15.25l19.25,10.8a2.08,2.08,0,0,1,.9,1.1M16.43,28.61l17.8,2.55,7.9-18.35L22.88,2,8.58,13,2,26.21l7.15,7.9,7.3-5.5'))

    offctx.fillStyle = '#a6c9cb'
    offctx.fill(new Path2D('M17.77,28.5l-6.92,5.61L4.08,26.05l6.25-13.47L23.89,1.36l18.24,11L34.64,31.1,17.77,28.5m3-17.14-1.5,4.35-4.35-1.8-3,1.3L6.73,25.31l3.85,1.8,5.7-4,14.85,1.8,4-9.7-11-5.3-3.35,1.45'))

    offctx.fillStyle = '#b5d5d7'
    offctx.fill(new Path2D('M20.78,11.36l3.35-1.45,11,5.3-4,9.7-14.85-1.8-5.7,4-3.85-1.8,5.15-10.1,3-1.3,4.35,1.8,1.5-4.35'))

    const drawFps = (fps) => {
      ctx.font = '20px sans-serif'
      ctx.textBaseline = 'top'
      ctx.fillStyle = 'black'
      const width = ctx.measureText(fps).width
      const height = ctx.measureText('M').width // close approximation of the vertical height by checking the length of a capital M
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = 'white'
      ctx.fillText(fps, 0, 0)
    }

    let lastTimestamp = 0
    let count = 0
    let timer = 0
    let fps = 0

    // const viewX = 100
    // const viewY = 100

    // const now = () => new Date().getTime()
    /*
    const rand = (max) => Math.round(Math.random() * max)

    const obj = []
    for (let i = 0; i < 300; i++) {
      obj.push({
        x: rand(500),
        y: rand(500)
      })
    }*/

    const render = (timestamp) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const deltaTime = timestamp - lastTimestamp
      count++
      timer += deltaTime

      if (timer >= 1000) {
        fps = count
        count = 0
        timer = 0
      }

      for (let i = 0; i < 1000; i++) {
        ctx.save()
        ctx.translate(i, i)
        ctx.drawImage(offcanvas, 0, 0)
        ctx.restore()
      }

      /*
      obj.forEach((d) => {
        ctx.save()
        ctx.translate(d.x, d.y)
        ctx.drawImage(offcanvas, 0, 0, 100, 100)
        ctx.restore()
      })
      */

      /*
         for (let i = 0; i < 1000; i++) {
           ctx.save()
           ctx.translate(rand(500), rand(500))

           // const transform = ctx.getTransform()
           //if (transform.e < viewX && transform.f < viewY) {
           ctx.rotate(rand(360))
           const s = rand(2)
           //ctx.scale(s, s)
           ctx.drawImage(offcanvas, 0, 0)
           // }

           ctx.restore()
         }
        */

      // ctx.restore()

      drawFps(fps)

      lastTimestamp = timestamp
      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
  }

  componentWillUnmount () {

  }

  render = () => {
    return <div>
      <canvas ref={(node) => (this.canvas = node)} />
    </div>
  }
}
