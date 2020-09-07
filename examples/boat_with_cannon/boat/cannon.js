import { GameObject, Components } from 'game_engine'
import Image from '../../assets/image'
const { Transform, Box } = Components
import Ball from './ball'

const cannonImage = new Image({
  id: 'cannon',
  width: 29,
  height: 20,
  createImage: (ctx) => {
    // wheels
    const p1 = new Path2D('M19.5,20V18h-5v2h5M2,18v2H7V18H2M7,2V0H2V2H7m7.5,0h5V0h-5Z')
    ctx.fillStyle = '#4e5f5f'
    ctx.fill(p1)

    // contour
    const p2 = new Path2D('M14.5,2H2a1.82,1.82,0,0,0-1.4.6A1.82,1.82,0,0,0,0,4V16a2,2,0,0,0,.6,1.45A1.88,1.88,0,0,0,2,18H22a1.89,1.89,0,0,0,2-2V4a1.88,1.88,0,0,0-.55-1.4A2,2,0,0,0,22,2H14.5M22,4V16H2V4Z')
    ctx.fillStyle = '#83592e'
    ctx.fill(p2)

    // frame inside
    const p3 = new Path2D('M2,6v8H22V6Z')
    ctx.fillStyle = '#d2904a'
    ctx.fill(p3)

    // frame sides
    const p4 = new Path2D('M2,14v2H22V14H2M22,6V4H2V6Z')
    ctx.fillStyle = '#af783e'
    ctx.fill(p4)

    // barrel contour
    const p5 = new Path2D('M13,4q-2.44-.1-3.5,2.6A8.38,8.38,0,0,0,9,10v.1A7.9,7.9,0,0,0,9.6,14a3.38,3.38,0,0,0,3.3,2h1.35a22.12,22.12,0,0,0,4.2-.4l4.7-.3c.13.07.28.13.45.2a1,1,0,0,0,.35.15,2.57,2.57,0,0,0,.75.1h1a2.86,2.86,0,0,0,1.45-.4h.05A3.17,3.17,0,0,0,28.3,14V14a11.79,11.79,0,0,0,.05-7.8A2.41,2.41,0,0,0,27,4.65a2.56,2.56,0,0,0-1.3-.35h-1a3,3,0,0,0-1.25.3,1.05,1.05,0,0,0-.3.15c-1.53-.13-3.08-.25-4.65-.35A22.88,22.88,0,0,0,14.25,4H13m-1.8,3.25A1.89,1.89,0,0,1,13,5.8h1.3a21.1,21.1,0,0,1,4.1.4l5.5.4.1,0a1.08,1.08,0,0,1,.3-.35,1.19,1.19,0,0,1,.45-.1h1a1,1,0,0,1,.5.15.8.8,0,0,1,.35.45,9.51,9.51,0,0,1,0,6.65,1.06,1.06,0,0,1-.35.45,1,1,0,0,1-.5.15h-1a1.19,1.19,0,0,1-.45-.1,3.63,3.63,0,0,1-.3-.35l-.1-.1-5.55.4a20.3,20.3,0,0,1-4.05.4H12.9q-2.25,0-2.1-4.15V10A6.51,6.51,0,0,1,11.15,7.25Z')
    ctx.fillStyle = '#4e5f5f'
    ctx.fill(p5)

    // barrel tip
    const p6 = new Path2D('M24.25,6.2a1.08,1.08,0,0,0-.3.35v7a3.63,3.63,0,0,0,.3.35,1.19,1.19,0,0,0,.45.1h1a1,1,0,0,0,.5-.15,1.06,1.06,0,0,0,.35-.45,9.51,9.51,0,0,0,0-6.65.8.8,0,0,0-.35-.45,1,1,0,0,0-.5-.15h-1A1.19,1.19,0,0,0,24.25,6.2Z')
    ctx.fillStyle = '#7e989a'
    ctx.fill(p6)

    // barrel
    const p7 = new Path2D('M13,5.8a1.89,1.89,0,0,0-1.8,1.45A6.51,6.51,0,0,0,10.8,10v.1q-.15,4.2,2.1,4.15h1.35a20.3,20.3,0,0,0,4.05-.4l5.55-.4.1.1V6.55l-.1,0-5.5-.4a21.1,21.1,0,0,0-4.1-.4Z')
    ctx.fillStyle = '#748c8e'
    ctx.fill(p7)
  }
})

export default class Cannon extends GameObject {
  constructor ({ x, y, flipX, flipY }) {
    super({ tag: 'cannon' })

    this.reloadTime = 2
    this.isReady = true
    this.addComponent(Transform, { x, y })
    this.addComponent(Box, { w: cannonImage.image.width, h: cannonImage.image.height, flipX, flipY })
  }

  now = () => (new Date()).getTime()

  shoot () {
    if (this.isReady) {
      this.lastFire = this.now()
      this.isReady = false
      this.spawn(Ball, { x: 10, y: 5 })
    }
  }

  update () {
    if (this.isReady) return

    if (this.now() - this.lastFire > this.reloadTime * 1000) {
      this.isReady = true
    }
  }

  render ({ ctx }) {
    ctx.drawImage(cannonImage.image, 0, 0)
  }
}
