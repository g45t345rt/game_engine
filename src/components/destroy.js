import Component from '../component'

export class Destroy extends Component {
  constructor (options = {}) {
    super(options)
    this.lifeSpan = typeNumberOrDefault(options.lifeSpan, 1000)
    this.elapsed = 0
  }

  update ({ deltaTime }) {
    if (this.elapsed > this.lifeSpan) {
      this.gameObject.destroy()
    }

    this.elapsed += deltaTime
  }
}