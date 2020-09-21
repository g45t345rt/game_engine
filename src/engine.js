export default class Engine {
  #timeoutUpdate = null
  #lastUpdate = 0
  #GameClass = null

  constructor (GameClass, options = {}) {
    this.#GameClass = GameClass
    this.updatePerSeconds = options.updatePerSeconds || 60
    this.updating = false


    this.init()
  }

  init () {

    this.game = new this.#GameClass()
    this.game.engine = this
    this.updater()
  }

  get loopSyncMS () {
    return 1000 / this.updatePerSeconds
  }

  start () {
    this.stopped = false
    /*
    if (!this.#timeoutUpdate) {
      this.updating = true
      this.#lastUpdate = performance.now()
      this.updater()
    }*/
  }

  stop () {
    this.stopped = true
    /*
    if (this.#timeoutUpdate) {
      this.updating = false
      clearTimeout(this.#timeoutUpdate)
      this.#timeoutUpdate = null
    }*/
  }

  reset () {
    this.stop()
    this.init()
    this.start()
  }

  updater () {
    const timestamp = performance.now()
    const deltaTime = timestamp - this.#lastUpdate

    const args = { timestamp, deltaTime }
    this.game.dispatch('engineUpdate', args)
    if (!this.stopped) this.game.dispatch('update', args)
    this.#lastUpdate = timestamp

    // delay the timeout to match loop speed (fps)
    this.#timeoutUpdate = setTimeout(this.updater.bind(this), this.loopSyncMS)
  }
}
