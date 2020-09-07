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
  }

  get loopSyncMS () {
    return 1000 / this.updatePerSeconds
  }

  now = () => (new Date()).getTime()

  start () {
    if (!this.#timeoutUpdate) {
      this.updating = true
      this.updater()
    }
  }

  stop () {
    if (this.#timeoutUpdate) {
      this.updating = false
      clearTimeout(this.#timeoutUpdate)
      this.#timeoutUpdate = null
    }
  }

  reset () {
    this.stop()
    this.init()
    this.start()
  }

  updater () {
    //return
    //const currentTime = this.now()
    //const deltaTime = currentTime - this.#lastUpdate - this.loopSyncMS
    this.game.dispatch('update')
    //this.#lastUpdate = currentTime

    //const nextUpdateTime = this.now() + this.loopSyncMS
    //this.#timeoutUpdate = setTimeout(this.updater.bind(this), this.loopSyncMS)

    // delay the timeout to match loop speed (fps)
    this.#timeoutUpdate = setTimeout(this.updater.bind(this), this.loopSyncMS)
  }
}
