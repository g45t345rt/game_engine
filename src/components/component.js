import { typeBoolOrDefault } from "../typeCheck"

export default class Component {
  constructor (options = {}) {
    this.enabled = typeBoolOrDefault(options.enabled, true)
    this.canDraw = typeBoolOrDefault(options.canDraw, true)
    this.canUpdate = typeBoolOrDefault(options.canUpdate, true)
  }

  // init()
  // update()
  // draw(ctx)

  getComponent = (Component) => this.gameObject.getComponent(Component)
  removeComponent = (Component) => this.gameObject.removeComponent(Component)
  requiredComponent = (...Components) => this.gameObject.requiredComponent(...Components)

  _update (args) {
    if (!this.enabled || !this.canUpdate) return
    if (typeof this.update === 'function') this.update(args)
  }

  _draw (args) {
    if (!this.enabled || !this.canUpdate) return
    if (typeof this.draw === 'function') this.draw(args)
  }
}