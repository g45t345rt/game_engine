import { Component, components, Input } from 'gemer'

const { Rect, Transform } = components

// Preset
export function newPlayer (options = {}) {
  const { x, y } = options

  const gameObject = new GameObject()
  gameObject.addComponent(Transform, { x, y })
  gameObject.addComponent(Rect, { w: 50, h: 50 })
  gameObject.addComponent(Player)

  return gameObject
}

export class NetworkPlayer extends Player {
  onData (data) {
    const { x, y } = data
    this.transform.x = x
    this.transform.y = y
  }

  intrapolate () {
    
  }
}

export default class Player extends Component {
  constructor (options) {
    super(options)

    this.speed = 1
  }

  init () {
    this.rect = this.getComponent(Rect)
    this.transform = this.getComponent(Transform)
  }

  update ({ deltaTime }) {
    const speed = this.speed * deltaTime
    if (Input.isKeyDown('KeyW')) {
      this.transform.y -= speed
    }

    if (Input.isKeyDown('KeyS')) {
      this.transform.y += speed
    }

    if (Input.isKeyDown('KeyA')) {
      this.transform.x -= speed
    }

    if (Input.isKeyDown('KeyD')) {
      this.transform.x += speed
    }
  }

  draw ({ ctx }) {
    ctx.fillStyle = 'yellow'
    ctx.fillRect(0, 0, this.rect.w, this.rect.h)
  }
}