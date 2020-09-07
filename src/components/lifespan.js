import GameComponent from '../gameComponent'

export default class Lifespan extends GameComponent {
  constructor ({ life }) {
    super('lifespan')

    this.life = life || 1
  }

  now = () => (new Date()).getTime()

  onSpawn = () => {
    this.timer = this.now()
  }

  update () {
    const now = this.now()
    if (now - this.timer > this.life * 1000) {
      this.timer = now
      this.gameObject.destroy()
    }
  }
}
