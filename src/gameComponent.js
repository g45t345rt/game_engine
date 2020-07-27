export default class GameComponent {
  constructor (name) {
    // Component is always reference to a gameobject
    this.name = name
    this.canRender = true
    this.canUpdate = true

    // Populated after the component is attached to a gameobject
    this.gameObject = null
  }

  // onAdd = () => {}
  // onRemove = () => {}
  // update = () => {}
  // render = () => {}
  // editorRender = () => {}
  // domRender = () => {}

  __render (args) {
    if (!this.canRender) return
    if (this.render && typeof this.render === 'function') this.render(args)
  }

  __update () {
    if (!this.canUpdate) return
    if (this.update && typeof this.update === 'function') this.update()
  }
}
