import { Components, GameObject } from 'game_engine'
const { Camera, Transform } = Components

export default class MyCamera extends GameObject {
  constructor ({ x, y, vx, vy, vw, vh, tag, ref }) {
    super({ tag: `camera${tag ? `-${tag}` : ''}` })

    this.ref = ref
    this.addComponent(Transform, { x, y })
    this.addComponent(Camera, { vx, vy, vw, vh, ref })
  }
}
