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

export default engine
