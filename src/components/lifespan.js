import GameComponent from '../gameComponent'
import Timer from './timer'

export default class Lifespan extends GameComponent {
  constructor ({ life }) {
    super('lifespan')

    this.life = life || 1 // in seconds
  }

  onAdd = () => this.gameObject.requiredComponent(Timer)

  update () {
    const timer = this.gameObject.getComponent(Timer)
    const lifespanTimer = timer.get('lifespan', { autoStart: true })
    if (lifespanTimer.elapsed > this.life * 1000) {
      this.gameObject.destroy()
      lifespanTimer.stop()
    }

    /*
    this.timer += deltaTime
    if (this.timer > this.life * 1000) {
      this.timer = 0
      this.gameObject.destroy()
    }
    */
  }
}
