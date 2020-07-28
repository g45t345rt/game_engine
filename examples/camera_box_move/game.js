import { GameObject, Components } from 'game_engine'
import MainCamera from './mainCamera'
import * as React from 'preact'
import Player from './player'
const { FpsCounter, Editor } = Components

export default class Game extends GameObject {
  constructor (canvas) {
    super('game')
    window.addEventListener('resize', this.onResize)

    this.canvas = canvas
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.addComponent(FpsCounter)
    this.addComponent(Editor)
    const mainCamera = this.spawn(MainCamera)
    mainCamera.spawn(Player)
  }

  onResize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}