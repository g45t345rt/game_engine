import { GameObject, Components } from 'game_engine'

import MainCamera from './mainCamera'
import Player from './player'
import Map from './map'

const { FpsCounter, Editor } = Components

export default class Game extends GameObject {
  constructor (canvas) {
    super({ tag: 'game' })
    window.addEventListener('resize', this.onResize)

    this.canvas = canvas
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.addComponent(FpsCounter)
    this.addComponent(Editor)

    const mainCamera = this.spawn(MainCamera)
    mainCamera.spawn(Map, { w: 500, h: 500 })
    mainCamera.spawn(Player)
  }

  onResize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}
