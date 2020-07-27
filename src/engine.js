export default class ServerEngine {
  constructor ({ game, fps }) {
    this.game = game
    this.loopSyncTime = 1000 / fps
    this.nextUpdateTime = 0
    this.lastTimestamp = 0

    this.update()
  }

  update () {
    const updateStartTime = (new Date()).getTime()
    this.game.__update()
    this.nextUpdateTime = updateStartTime + this.loopSyncTime
    setTimeout(this.update.bind(this), this.nextUpdateTime - (new Date()).getTime())
  }
}
