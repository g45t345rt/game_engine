import { GameObject, Components } from 'game_engine'
import Image from '../../assets/image'
const { Keyboard, Transform, Box } = Components

import Cannon from './cannon'

const boatImage = new Image({
  id: 'boat',
  width: 40,
  height: 108,
  createImage: (ctx) => {
    // contour
    const p1 = new Path2D('M20.05,0H20Q11.56,0,5.6,7.1A24.24,24.24,0,0,0,.05,22.25c0,.4,0,.8,0,1.2V64.3c0,1.33.12,2.65.25,4,.1,1.1.22,2.18.35,3.25q2.7,21,17,35.5v0a3.36,3.36,0,0,0,1.45.85,3.24,3.24,0,0,0,1.8,0,3.38,3.38,0,0,0,1.45-.9q14.35-14.44,17-35.5c.13-1.07.25-2.15.35-3.25.13-1.3.22-2.62.25-4v-42A24.46,24.46,0,0,0,34.4,7.1Q28.4-.05,20.05,0m12.8,8.35A22.7,22.7,0,0,1,38,22.25v42c0,1.37-.12,2.72-.25,4-.1,1.1-.22,2.18-.35,3.25a57.93,57.93,0,0,1-16.5,34.1,1.05,1.05,0,0,1-.55.35,1.19,1.19,0,0,1-.7,0,1.4,1.4,0,0,1-.6-.35A58,58,0,0,1,2.6,71.5c-.13-1.07-.25-2.15-.35-3.25-.13-1.33-.22-2.68-.25-4V23.45c0-.4,0-.8,0-1.2a22.47,22.47,0,0,1,5.1-13.9Q12.45,1.95,20,2T32.85,8.35Z')
    ctx.fillStyle = '#6d4b27'
    ctx.fill(p1)

    // inner contour
    const p2 = new Path2D('M38,22.25a22.7,22.7,0,0,0-5.15-13.9Q27.5,1.95,20,2T7.15,8.35a22.47,22.47,0,0,0-5.1,13.9c0,.4,0,.8,0,1.2V64.2c0,1.37.12,2.72.25,4,.1,1.1.22,2.18.35,3.25a58,58,0,0,0,16.45,34.1,1.4,1.4,0,0,0,.6.35,1.19,1.19,0,0,0,.7,0,1.05,1.05,0,0,0,.55-.35A57.93,57.93,0,0,0,37.4,71.5c.13-1.07.25-2.15.35-3.25.13-1.33.22-2.68.25-4V22.25M29.8,11v0A19.11,19.11,0,0,1,34,22.25v41.8c-.07,1.43-.15,2.83-.25,4.2-.13,1.1-.27,2.18-.4,3.25A54.41,54.41,0,0,1,20,100.75,54.68,54.68,0,0,1,6.65,71.5c-.13-1.07-.25-2.15-.35-3.25q-.19-2-.3-4V23.45c0-.4,0-.8,0-1.2a18.73,18.73,0,0,1,4.2-11.35A12.37,12.37,0,0,1,20,6h.05A12.48,12.48,0,0,1,29.8,11Z')
    ctx.fillStyle = '#b47b41'
    ctx.fill(p2)

    // silver lines
    const p3 = new Path2D('M9.4,62.25v-12H6v12H9.4M22.3,79.9A3.14,3.14,0,0,0,20,79a3.25,3.25,0,0,0-3.3,3.3,3.14,3.14,0,0,0,.95,2.3,3.21,3.21,0,0,0,2.35,1,3,3,0,0,0,2.3-1,3,3,0,0,0,1-2.3,3.21,3.21,0,0,0-1-2.35m-2.3.7a1.67,1.67,0,0,1,1.15.45,1.64,1.64,0,0,1,.5,1.2A1.71,1.71,0,0,1,20,83.9a1.64,1.64,0,0,1-1.2-.5,1.67,1.67,0,0,1-.45-1.15A1.55,1.55,0,0,1,20,80.6M30.6,43.75H34v-12H30.6v12m3.4,6.5H30.6v12H34v-12M9.4,43.75v-12H6v12Z')
    ctx.fillStyle = '#95b4b6'
    ctx.fill(p3)

    // front deck
    const p4 = new Path2D('M20,100.75A54.41,54.41,0,0,0,33.35,71.5H6.65A54.68,54.68,0,0,0,20,100.75M20,79a3.14,3.14,0,0,1,2.3,1,3.21,3.21,0,0,1,1,2.35,3,3,0,0,1-1,2.3,3,3,0,0,1-2.3,1,3.21,3.21,0,0,1-2.35-1,3.14,3.14,0,0,1-.95-2.3A3.25,3.25,0,0,1,20,79m14-55.5v-1.2H6.05c0,.4,0,.8,0,1.2v3.3H34Z')
    ctx.fillStyle = '#8e6132'
    ctx.fill(p4)

    // front pole
    const p5 = new Path2D('M21.15,81.05A1.67,1.67,0,0,0,20,80.6a1.55,1.55,0,0,0-1.65,1.65,1.67,1.67,0,0,0,.45,1.15,1.64,1.64,0,0,0,1.2.5,1.71,1.71,0,0,0,1.65-1.65A1.64,1.64,0,0,0,21.15,81.05Z')
    ctx.fillStyle = '#7e989a'
    ctx.fill(p5)

    // front bar
    const p6 = new Path2D('M33.35,71.5c.13-1.07.27-2.15.4-3.25H6.3c.1,1.1.22,2.18.35,3.25Z')
    ctx.fillStyle = '#a8733b'
    ctx.fill(p6)

    // silver lines +
    const p7 = new Path2D('M30.6,50.25H27.75v12H30.6v-12m-2.85-18.5v12H30.6v-12H27.75m-15.5,18.5H9.4v12h2.85v-12m0-18.5H9.4v12h2.85Z')
    ctx.fillStyle = '#a7cacd'
    ctx.fill(p7)

    // middle deck
    const p8 = new Path2D('M9.4,31.75h2.85v12H6v6.5h6.25v12H6v2q.11,2.05.3,4H33.75c.1-1.37.18-2.77.25-4.2v-1.8H27.75v-12H34v-6.5H27.75v-12H34v-5H6v5H9.4M15.1,49.1V39.25H25V49.1ZZ')
    ctx.fillStyle = '#956635'
    ctx.fill(p8)

    // middle square pole
    const p9 = new Path2D('M15.1,39.25V49.1H25V39.25Z')
    ctx.fillStyle = '#83592e'
    ctx.fill(p9)

    // back deck
    const p10 = new Path2D('M29.8,10.9v0A12.48,12.48,0,0,0,20.05,6H20a12.37,12.37,0,0,0-9.75,4.9,18.73,18.73,0,0,0-4.2,11.35H34A19.11,19.11,0,0,0,29.8,10.9Z')
    ctx.fillStyle = '#a3703a'
    ctx.fill(p10)
  }
})

const sailImage = new Image({
  id: 'sail',
  width: 66,
  height: 70,
  createImage: (ctx) => {
    // sail contour
    const p1 = new Path2D('M61.6,25.9a1.83,1.83,0,0,0-.55-1.35A2,2,0,0,0,59.6,24H6.45a1.88,1.88,0,0,0-1.4.55,1.77,1.77,0,0,0-.6,1.35v3.35A2.15,2.15,0,0,0,4.8,30.4Q-.15,43.86.4,51.65a21.86,21.86,0,0,0,.3,3.6s-.07,0-.1.1a1.61,1.61,0,0,0-.6,1.3v3A1.92,1.92,0,0,0,.6,61a1.88,1.88,0,0,0,1.4.55H5.3q2.81,1.39,5.65,2.6a76.45,76.45,0,0,0,11.3,3.9q.86.2,1.65.45A81.05,81.05,0,0,0,32.8,70h.45a79.32,79.32,0,0,0,8.8-1.5c.57-.13,1.13-.28,1.7-.45a84.65,84.65,0,0,0,17-6.5H64A2,2,0,0,0,65.45,61,2,2,0,0,0,66,59.6v-3a1.66,1.66,0,0,0-.55-1.3l-.15-.15a18.28,18.28,0,0,0,.25-3.55v0Q66,43.8,61.2,30.4a1.77,1.77,0,0,0,.4-1.15V25.9m-2,3.35h-1q5.4,14.25,4.9,22.3a15.48,15.48,0,0,1-.65,5.1H64v3H60.25a82.33,82.33,0,0,1-10.4,4.55H49.8c-2.63.93-5.27,1.73-7.9,2.4a68.91,68.91,0,0,1-8.9,1.5,70.54,70.54,0,0,1-8.95-1.5q-3.94-1-7.85-2.4A81.09,81.09,0,0,1,5.75,59.6H2v-3h1a17.59,17.59,0,0,1-.65-5.1q-.5-8.05,4.95-22.3h-.9V25.9H59.6Z')
    ctx.fillStyle = '#b1a691'
    ctx.fill(p1)

    // topbar1
    const p2 = new Path2D('M64,56.65H62.9a17.26,17.26,0,0,1-.5,1.8c-.7.4-1.42.78-2.15,1.15H64v-3m-58.25,3c-.7-.37-1.4-.75-2.1-1.15q-.35-.9-.6-1.8H2v3H5.75m8-30.35V25.9H6.45v3.35h7.3m32.05,0V25.9H20.15v3.35H45.8m12.85,0h1V25.9H52.2v3.35Z')
    ctx.fillStyle = '#956635'
    ctx.fill(p2)

    // sail1
    const p3 = new Path2D('M16.2,64.15q3.9,1.39,7.85,2.4a70.54,70.54,0,0,0,9,1.5,68.91,68.91,0,0,0,8.9-1.5c2.63-.67,5.27-1.47,7.9-2.4h.05L45.8,29.25H20.15L16.2,64.15m-2.45-34.9H7.35Q1.91,43.5,2.4,51.55a17.59,17.59,0,0,0,.65,5.1q.26.9.6,1.8l10.1-29.2m49.8,22.3q.5-8.05-4.9-22.3H52.2l10.2,29.2a17.26,17.26,0,0,0,.5-1.8A15.48,15.48,0,0,0,63.55,51.55Z')
    ctx.fillStyle = '#f3e5c8'
    ctx.fill(p3)

    // sail2
    const p4 = new Path2D('M20.15,29.25h-6.4L3.65,58.45c.7.4,1.4.78,2.1,1.15A81.09,81.09,0,0,0,16.2,64.15l3.95-34.9m32.05,0H45.8l4.05,34.9a82.33,82.33,0,0,0,10.4-4.55c.73-.37,1.45-.75,2.15-1.15Z')
    ctx.fillStyle = '#fff1d2'
    ctx.fill(p4)

    // topbar2
    const p5 = new Path2D('M20.15,25.9h-6.4v3.35h6.4V25.9M52.2,29.25V25.9H45.8v3.35Z')
    ctx.fillStyle = '#af783e'
    ctx.fill(p5)

    // contour post
    const p6 = new Path2D('M42.25,24.15l.3-.6.05-.05.1-.2a6.77,6.77,0,0,0,.3-2.05c.07-2.13-1-3.93-3.25-5.4A12,12,0,0,0,33,14a12,12,0,0,0-6.7,1.8l-.05,0Q23,18.06,23,21.25a5.17,5.17,0,0,0,.4,2.05l.05.05a7.07,7.07,0,0,0,.65,1.2l1.95,3.6A4.82,4.82,0,0,0,28.2,30.7,8.76,8.76,0,0,0,33,32a8.34,8.34,0,0,0,4.75-1.3.16.16,0,0,0,.1-.05A5.38,5.38,0,0,0,40,28.25l2.2-4a.16.16,0,0,1,0-.1M40.8,22.7c-.1.2-.2.38-.3.55L38.2,27.4a3.42,3.42,0,0,1-1.45,1.65,6.73,6.73,0,0,1-3.75,1,7.16,7.16,0,0,1-3.8-1,3.18,3.18,0,0,1-1.35-1.65l-2.15-4a3.09,3.09,0,0,1-.5-.8A3.63,3.63,0,0,1,25,21.25a4.57,4.57,0,0,1,2.35-3.8A10.53,10.53,0,0,1,33,16a10.39,10.39,0,0,1,5.7,1.5,4.57,4.57,0,0,1,2.35,3.8,4.64,4.64,0,0,1-.2,1.35A.16.16,0,0,0,40.8,22.7Z')
    ctx.fillStyle = '#6d4b27'
    ctx.fill(p6)

    // inside post
    const p7 = new Path2D('M36.75,29.05A3.42,3.42,0,0,0,38.2,27.4l2.3-4.15A6.28,6.28,0,0,1,38.7,25a3.57,3.57,0,0,1-.7.4,10.4,10.4,0,0,1-5,1.15,10.28,10.28,0,0,1-4.95-1.15,3,3,0,0,1-.75-.4,5.53,5.53,0,0,1-1.6-1.55l2.15,4a3.18,3.18,0,0,0,1.35,1.65,7.16,7.16,0,0,0,3.8,1,6.73,6.73,0,0,0,3.75-1m1.5-6.9a2.83,2.83,0,0,0,.15-.9,2.93,2.93,0,0,0-1.55-2.5,7.49,7.49,0,0,0-7.65,0,2.93,2.93,0,0,0-1.55,2.5,2.26,2.26,0,0,0,.2.9,2,2,0,0,0,.3.55,4.38,4.38,0,0,0,1.05,1l.5.3a7.1,7.1,0,0,0,3.3.75A7,7,0,0,0,36.35,24l.5-.3A3.38,3.38,0,0,0,38,22.6l.2-.4Z')
    ctx.fillStyle = '#986835'
    ctx.fill(p7)

    // post
    const p8 = new Path2D('M40.5,23.25c.1-.17.2-.35.3-.55a.16.16,0,0,1,.05-.1,4.64,4.64,0,0,0,.2-1.35,4.57,4.57,0,0,0-2.35-3.8A10.39,10.39,0,0,0,33,16a10.53,10.53,0,0,0-5.7,1.5A4.57,4.57,0,0,0,25,21.25a3.63,3.63,0,0,0,.25,1.35,3.09,3.09,0,0,0,.5.8A5.53,5.53,0,0,0,27.3,25a3,3,0,0,0,.75.4A10.28,10.28,0,0,0,33,26.5a10.4,10.4,0,0,0,5-1.15,3.57,3.57,0,0,0,.7-.4,6.28,6.28,0,0,0,1.8-1.7m-2.1-2a2.83,2.83,0,0,1-.15.9l0,.05-.2.4a3.38,3.38,0,0,1-1.15,1.1l-.5.3a7,7,0,0,1-3.35.75A7.1,7.1,0,0,1,29.7,24l-.5-.3a4.38,4.38,0,0,1-1.05-1,2,2,0,0,1-.3-.55,2.26,2.26,0,0,1-.2-.9,2.93,2.93,0,0,1,1.55-2.5,7.49,7.49,0,0,1,7.65,0A2.93,2.93,0,0,1,38.4,21.25Z')
    ctx.fillStyle = '#af783e'
    ctx.fill(p8)

    // top sail contour
    const p9 = new Path2D('M35.15.9h0A2.72,2.72,0,0,0,33.05,0h0a2.78,2.78,0,0,0-2.1.9A2.78,2.78,0,0,0,30,3V19.1a2.72,2.72,0,0,0,.9,2v.05A3,3,0,0,0,33,22h0a2.9,2.9,0,0,0,2.05-.8l0-.05a2.79,2.79,0,0,0,.85-2V3A2.85,2.85,0,0,0,35.15.9M34,3V19.05a1,1,0,0,1-2,0V3a1,1,0,0,1,.3-.7,1,1,0,0,1,1.4,0A1,1,0,0,1,34,3Z')
    ctx.fillStyle = '#b1a691'
    ctx.fill(p9)

    // top sail
    const p10 = new Path2D('M34,19.05V3a1,1,0,0,0-.3-.7,1,1,0,0,0-1.4,0A1,1,0,0,0,32,3V19.05a1,1,0,0,0,2,0Z')
    ctx.fillStyle = '#f3e5c8'
    ctx.fill(p10)
  }
})

class Sail extends GameObject {
  constructor ({ x, y }) {
    super({ id: 'sail' })

    this.addComponent(Transform, { x, y, r: 0.3 })
    this.addComponent(Box, { w: 66, h: 70, oX: 0.5, oY: 0.5 })
  }

  render ({ ctx }) {
    ctx.globalAlpha = 0.7
    ctx.drawImage(sailImage.image, 0, 0)
  }
}

export default class Boat extends GameObject {
  constructor ({ x, y }) {
    super({ id: 'boat' })

    this.speed = 0
    this.turn = 0

    this.maxSpeed = 2
    this.maxTurn = 0.2

    this.addComponent(Transform, { x, y })
    this.addComponent(Box, { w: boatImage.image.width, h: boatImage.image.height, oX: 0.5, oY: 0.5 })
    this.addComponent(Keyboard)

    // left cannons
    this.spawn(Cannon, { x: -10, y: 10, flipX: true })
    this.spawn(Cannon, { x: -10, y: 30, flipX: true })
    this.spawn(Cannon, { x: -10, y: 50, flipX: true })

    // right cannons
    this.spawn(Cannon, { x: 20, y: 10 })
    this.spawn(Cannon, { x: 20, y: 30 })
    this.spawn(Cannon, { x: 20, y: 50 })

    this.spawn(Sail, { x: 20, y: 25 })
  }

  render ({ ctx }) {
    ctx.drawImage(boatImage.image, 0, 0)
  }

  update () {
    const { isKeyDown } = this.getComponent(Keyboard)
    const box = this.getComponent(Box)
    const transform = this.getComponent(Transform)

    const { x, y } = box.getOriginPoint()
    transform.up(this.speed, x, y)

    if (isKeyDown('a')) {
      transform.rotation -= 0.01 * this.speed
    }

    if (isKeyDown('d')) {
      transform.rotation += 0.01 * this.speed
    }

    if (isKeyDown('w')) {
      if (this.speed < this.maxSpeed) {
        this.speed += 0.1
      }
    }

    if (isKeyDown('s')) {
      if (this.speed > 0) {
        this.speed -= 0.02
      }
    }

    if (isKeyDown(' ')) {
      const cannons = this.getGameObject({ tag: 'cannon', multiple: true })
      cannons.forEach((cannon) => cannon.shoot())
    }
  }
}
