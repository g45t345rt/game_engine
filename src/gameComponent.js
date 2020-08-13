import Dispatch from './dispatch'

export default class GameComponent extends Dispatch {
  static clientOnly = true

  constructor (name) {
    super()

    // Unique name (gameobject cannot have identical components)
    this.name = name

    // Component is always reference to a gameobject
    // Populated after the component is attached to a gameobject
    this.gameObject = null
  }

  // onAdd = () => {}
  // onRemove = () => {}
  // update = () => {}
  // clientUpdate = () => {}
  // serverUpdate = () => {}
  // render = () => {}
  // editorRender = () => {}
  // domRender = () => {}

  /*
  __render (args) {
    if (!this.canRender) return
    if (this.render && typeof this.render === 'function') this.render(args)
  }

  __update () {
    if (!this.canUpdate) return
    if (this.update && typeof this.update === 'function') this.update()
    if (this.clientUpdate && typeof this.clientUpdate === 'function' && this.isClient) this.clientUpdate()
    if (this.serverUpdate && typeof this.serverUpdate === 'function' && !this.isClient) this.serverUpdate()
  }*/
}
