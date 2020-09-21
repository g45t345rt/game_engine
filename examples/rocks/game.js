import { h, Fragment } from 'preact'
import { GameObject, Components } from 'game_engine'
import FpsCounter from '../presets/fpsCounter'

import Scene from './scene'

export default class Game extends GameObject {
  constructor () {
    super({ tag: 'game' })

    this.spawn(FpsCounter, { index: 1 })
    this.spawn(Scene, { objCount: 500 })
  }

  editorRender = () => {
    return <Fragment>
      <button onClick={() => {
        const scene = this.getGameObject({ Type: Scene })
        for (let i = 0; i < 10; i++) {
          scene.spawnRock()
        }
      }}>add rock</button>
      <button onClick={() => {
        const scene = this.getGameObject({ Type: Scene })
        scene.destroyRock()
      }}>remove rock</button>
      <button onClick={() => {
        const scene = this.getGameObject({ Type: Scene })
        scene.clearGameObjects()
      }}>clear rocks</button>
    </Fragment>
  }
}
