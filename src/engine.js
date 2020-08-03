const engine = ({ game, fps = 60 }) => {
  const loopSyncTime = 1000 / fps
  let nextUpdateTime = 0

  const update = () => {
    const updateStartTime = (new Date()).getTime()
    game.__update()
    nextUpdateTime = updateStartTime + loopSyncTime
    setTimeout(update, nextUpdateTime - (new Date()).getTime())
  }

  update()
}

export default engine
