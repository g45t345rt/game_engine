import { GameObject, Components } from 'game_engine'

import MainCamera from '../presets/mainCamera'
import FpsCounter from '../presets/fpsCounter'
import Player from './player'

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.spawn(FpsCounter, { index: 1 })

    const scene = new GameObject({ tag: 'scene', explicitRender: true })
    scene.spawn(Player)

    this.addGameObject(scene)

    this.spawn(MainCamera, { gameObjectToRender: scene, w: 500, h: 300 })
  }
}
