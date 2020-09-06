import { GameObject, Components } from 'game_engine'

const { Box, Transform, Mouse, Image, DrawName, MouseDrag } = Components

export default class Rock extends GameObject {
  constructor ({ x, y }) {
    super({ tag: 'rock' })
    this.addComponent(Transform, { x, y })
    const box = this.addComponent(Box, { w: 44, h: 36, oX: 0.5, oY: 0.5 })
    box.draw = false
    this.addComponent(Image, {
      id: 'test',
      createImage: (ctx) => {
        ctx.fillStyle = '#5f7e80'
        ctx.fill(new Path2D('M44,12.16A2,2,0,0,1,44,13.61L36.08,32l-.85.95L34,33.16,17,30.71l-6.65,5a2.07,2.07,0,0,1-1.4.4,1.74,1.74,0,0,1-1.25-.65L.53,27.56a1.63,1.63,0,0,1-.5-1,2,2,0,0,1,.15-1.2l6.6-13.2.6-.65,14.3-11A1.72,1.72,0,0,1,22.73,0a2,2,0,0,1,1.15.25l19.25,10.8a2.08,2.08,0,0,1,.9,1.1M16.43,28.61l17.8,2.55,7.9-18.35L22.88,2,8.58,13,2,26.21l7.15,7.9,7.3-5.5'))

        ctx.fillStyle = '#a6c9cb'
        ctx.fill(new Path2D('M17.77,28.5l-6.92,5.61L4.08,26.05l6.25-13.47L23.89,1.36l18.24,11L34.64,31.1,17.77,28.5m3-17.14-1.5,4.35-4.35-1.8-3,1.3L6.73,25.31l3.85,1.8,5.7-4,14.85,1.8,4-9.7-11-5.3-3.35,1.45'))

        ctx.fillStyle = '#b5d5d7'
        ctx.fill(new Path2D('M20.78,11.36l3.35-1.45,11,5.3-4,9.7-14.85-1.8-5.7,4-3.85-1.8,5.15-10.1,3-1.3,4.35,1.8,1.5-4.35'))
      },
      width: 44,
      height: 36
    })
    //this.addComponent(Mouse)
    //this.addComponent(MouseDrag)
    //this.addComponent(DrawName)
  }

  update () {
    const transform = this.getComponent(Transform)
    transform.x += 0.1
    transform.rotation += 0.01
  }
}
