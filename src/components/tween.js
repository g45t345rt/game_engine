import Component from '../component'
import { typeFuncOrDefault, typeNumberOrDefault } from '../typeCheck'

export class Tween extends Component {
  constructor (options = {}) {
    super(options)

    this.onUpdate = typeFuncOrDefault(options.onUpdate, null)
    this.onComplete = typeFuncOrDefault(options.onComplete, null)
    this.startWait = typeNumberOrDefault(options.startWait, 0)
    this.endWait = typeNumberOrDefault(options.endWait, 0)
    this.duration = typeNumberOrDefault(options.duration, 1000)

    this.elapsed = -this.startWait
    this.done = false
  }

  reset () {
    this.elapsed = 0
    this.done = false
  }

  update (deltaTime) {
    if (this.done) return

    if (this.elapsed > 0 && this.elapsed && this.elapsed < this.duration) {
      const delta = this.elapsed / this.duration
      if (typeof this.onUpdate === 'function') this.onUpdate(delta)
    }

    if (this.elapsed > this.duration + this.endWait) {
      this.done = true
      if (typeof this.onComplete === 'function') this.onComplete()
    }

    this.elapsed += deltaTime
  }
}