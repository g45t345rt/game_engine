import { GameObject, Components } from 'game_engine'
const { Grid, Transform } = Components

export default class Map extends GameObject {
  constructor ({ x, y, w, h }) {
    super({ tag: 'map' })

    this.addComponent(Transform, { x, y })
    this.addComponent(Grid, { w, h })
  }
}