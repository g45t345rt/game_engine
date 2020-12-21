export class FpsCounter {
  #frames = 0
  #elapsed = 0

  constructor () {
    this.fps = 0
  }

  update (deltaTime) {
    if (this.#elapsed > 1000) {
      this.fps = this.#frames
      this.#elapsed = 0
      this.#frames = 0
    }

    this.#frames++
    this.#elapsed += deltaTime
  }
}

export default FpsCounter
