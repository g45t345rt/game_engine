import { h } from 'preact'
import GameComponent from '../../gameComponent'
import GameObjectEditor from './GameObjectEditor'

export default class Editor extends GameComponent {
  constructor () {
    super('editor')
  }

  domRender = () => {
    return <GameObjectEditor ref={(node) => (this.dom = node)} gameObject={this.gameObject} />
  }

  update () {
    if (this.dom) this.dom.forceUpdate()
  }
}
