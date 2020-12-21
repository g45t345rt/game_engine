import { typeNumberOrDefault, typeObject, typeString, typeStringOrDefault } from './typeCheck'

export class Updater extends EventTarget {
  #lastUpdate = 0
  #updateTimeout = null

  constructor (options = {}) {
    super()

    this.root = typeObject(options.root)
    this.funcName = typeStringOrDefault(options.funcName, '_update')
    this.ups = typeNumberOrDefault(options.ups || 60) // update per seconds
  }

  start () {
    this.#update() // if you stop and start after a long time deltaTime will be a big number (use resume if you don't want this behavior)
  }

  resume () {
    this.#lastUpdate = performance.now() // reset deltatime to zero
    this.#update()
  }

  stop () {
    if (this.#updateTimeout) clearTimeout(this.#updateTimeout)
  }

  stepForward () {
    const deltaTime = 1000 / this.ups
    const timestamp = this.#lastUpdate + deltaTime
    this.#step({ timestamp, deltaTime })
  }

  stepBackward () {
    const deltaTime = -(1000 / this.ups)
    const timestamp = this.#lastUpdate + deltaTime
    this.#step({ timestamp, deltaTime })
  }

  #step (args) {
    this.root[this.funcName](args)
    this.dispatchEvent(new Event('update', args))
    this.#lastUpdate = args.timestamp
  }

  #update () {
    const timestamp = performance.now()
    const deltaTime = timestamp - this.#lastUpdate
    this.#step({ timestamp, deltaTime })

    this.#updateTimeout = setTimeout(this.#update.bind(this), 1000 / this.ups)
  }
}

export default Updater