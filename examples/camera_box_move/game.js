import { GameObject, Components } from 'game_engine'

import MainCamera from './mainCamera'
import Player from './player'
import Map from './map'

const { FpsCounter, Editor } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.addComponent(FpsCounter)
    this.addComponent(Editor)

    const scene = new GameObject({ tag: 'scene' })
    scene.canRender = false
    scene.spawn(Map, { w: 500, h: 500 })
    scene.spawn(Player)

    this.addGameObject(scene)

    this.spawn(MainCamera, { ref: scene })
  }
}
