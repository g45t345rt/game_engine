export default class Engine {
  #timeoutUpdate = null

  constructor (game, options = {}) {
    this.game = game
    this.fps = options.fps || 60
  }

  get loopSyncTime () {
    return 1000 / this.fps
  }

  now = () => (new Date()).getTime()

  start () {
    if (!this.#timeoutUpdate) this.updater()
  }

  stop () {
    if (this.#timeoutUpdate) clearTimeout(this.#timeoutUpdate)
  }

  updater () {
    const updateStartTime = this.now()
    this.game.dispatch('update')
    const nextUpdateTime = updateStartTime + this.loopSyncTime
    this.#timeoutUpdate = setTimeout(this.updater.bind(this), nextUpdateTime - this.now())
  }
}
