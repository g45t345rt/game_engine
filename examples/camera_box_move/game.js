import { GameObject, Components } from 'game_engine'

import MainCamera from '../presets/mainCamera'
import FpsCounter from '../presets/fpsCounter'
import Player from './player'
import Map from './map'

const { Editor } = Components

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.addComponent(Editor)
    this.spawn(FpsCounter, { index: 1, render: 'self' })

    const scene = new GameObject({ tag: 'scene' })
    scene.spawn(Map, { w: 500, h: 500 })
    scene.spawn(Player)

    this.addGameObject(scene)

    this.spawn(MainCamera, { render: scene, vw: 500, vh: 300 })
  }
}
