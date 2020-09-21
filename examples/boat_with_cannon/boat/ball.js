import { GameObject, Components, Misc } from 'game_engine'
import Image from '../../assets/image'

const { Keyboard, Transform, Box, Lifespan, Animate, Timer } = Components

import Cannon from './cannon'
import Easing from '../../../src/misc/easing'

const ballImage = new Image({
  tag: 'ball',
  width: 10,
  height: 10,
  createImage: (ctx) => {
    // contour
    const p1 = new Path2D('M10,5A4.94,4.94,0,0,0,8.6,1.45a.16.16,0,0,1,0-.1A4.91,4.91,0,0,0,5,0,5,5,0,0,0,1.55,1.3a.28.28,0,0,0-.15.15A4.94,4.94,0,0,0,0,5,4.82,4.82,0,0,0,1.45,8.55,4.82,4.82,0,0,0,5,10,4.82,4.82,0,0,0,8.6,8.5v.05A4.94,4.94,0,0,0,10,5M7.15,2.8A3.07,3.07,0,0,1,8,5a2.85,2.85,0,0,1-.85,2.1A2.83,2.83,0,0,1,5,8a2.94,2.94,0,0,1-2.15-.9A2.85,2.85,0,0,1,2,5a3.07,3.07,0,0,1,.85-2.2A3.15,3.15,0,0,1,5,2,3,3,0,0,1,7.15,2.8Z')
    ctx.fillStyle = '#394646'
    ctx.fill(p1)

    const p2 = new Path2D('M8,5a3.07,3.07,0,0,0-.85-2.2A3,3,0,0,0,5,2a3.15,3.15,0,0,0-2.15.8A3.07,3.07,0,0,0,2,5a2.85,2.85,0,0,0,.85,2.1A2.94,2.94,0,0,0,5,8a2.83,2.83,0,0,0,2.15-.9A2.85,2.85,0,0,0,8,5Z')
    ctx.fillStyle = '#4e5f5f'
    ctx.fill(p2)
  }
})

export default class Ball extends GameObject {
  constructor ({ x, y }) {
    super({ tag: 'ball', index: -1 })

    const transform = this.addComponent(Transform, { x, y, attachedToParent: false })
    this.addComponent(Box, { w: ballImage.image.width, h: ballImage.image.height, oX: 0.5, oY: 0.5 })
    this.addComponent(Animate, [
      {
        targets: [transform],
        duration: 1000,
        values: [{ scaleX: 1.3, scaleY: 1.3 }],
      },
      {
        delay: 1000,
        duration: 1500,
        easing: Easing.inQuad,
        targets: [transform],
        values: [{ scaleX: 0, scaleY: 0 }]
      }
    ])
    this.addComponent(Timer)
    this.addComponent(Lifespan, { life: 1 })
  }

  onSpawn () {
    const transform = this.getComponent(Transform)
    this.startPosition = { x: transform.x, y: transform.y }
  }

  render ({ ctx }) {
    ctx.drawImage(ballImage.image, 0, 0)
  }

  update () {
    const transform = this.getComponent(Transform)
    transform.x += 3

    //const { x, y } = this.startPosition
    //if (transform.distance(x, y) > 10) {
    //this.destroy()
    //}
  }
}
