/*
const engine = ({ game, fps = 60 }) => {
  const loopSyncTime = 1000 / fps
  const now = () => (new Date()).getTime()

  const dispatchUpdate = (gameObject) => {
    const { components, gameObjects: childs } = gameObject
    gameObject.dispatch('update')

    components.forEach((component) => component.dispatch('update'))
    childs.forEach((child) => child.dispatch('update'))
  }

  const update = () => {
    const updateStartTime = now()
    dispatchUpdate(game)
    const nextUpdateTime = updateStartTime + loopSyncTime
    setTimeout(update, nextUpdateTime - now())
  }

  update()
}
*/

// export default engine

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
