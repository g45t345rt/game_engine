import { callFuncObjects } from './helpers'
import { typeBoolOrDefault, typeStringOrDefault } from './typeCheck'
import { nanoid } from 'nanoid'

export class GameObject {
  constructor (options = {}) {
    this.id = nanoid(10)
    this.tag = typeStringOrDefault(options.tag, null)
    this.refKey = null // assigned when the gameObject is added to a parent

    this.enabled = typeBoolOrDefault(options.enabled, true)
    this.canDraw = typeBoolOrDefault(options.canDraw, true)
    this.canUpdate = typeBoolOrDefault(options.canUpdate, true)
    this.autoDraw = typeBoolOrDefault(options.autoDraw, true) // draw automatically from parent continuing the tree

    this.components = {} // contains any added components
    this.childs = {} // contains childs gameobject
    this.parent = null

    this.drawIndex = 0
  }

  name () {
    if (!this.parent) return `Root [${this.id}]`
    if (this.refKey) return this.refKey
    return `GameObject [${this.id}]`
  }

  _update (args) {
    if (!this.enabled || !this.canUpdate) return

    this.updateComponents(args)
    if (typeof this.update === 'function') this.update(args)
    this.updateChilds(args)
  }

  _draw (args) {
    if (!this.enabled || !this.canDraw) return
    if (!this.autoDraw && !args.forceDraw) return

    const { ctx } = args
    ctx.save()
    if (typeof this.preDraw === 'function') this.preDraw(args)
    this.drawComponents(args)
    if (typeof this.draw === 'function') this.draw(args)
    this.drawChilds(args)
    if (typeof this.postDraw === 'function') this.postDraw(args)
    ctx.restore()
  }

  updateComponents (args) {
    callFuncObjects(this.components, '_update', args)
  }

  updateChilds (args) {
    callFuncObjects(this.childs, '_update', args)
  }

  drawComponents (args) {
    callFuncObjects(this.components, '_draw', args)
  }

  drawChilds (args) {
    callFuncObjects(this.childs, '_draw', args)
  }

  setChilds (setFunc) {
    Object.keys(this.childs).forEach((key) => setFunc(this.childs[key]))
  }

  destroy () {
    if (this.parent) {
      this.refKey = null
      this.parent.removeChild(this)
    } else {
      console.warn(`Gameobject cannot destroy itself without a parent.`)
    }
  }

  addChild (gameObject, key) {
    const newKey = key || gameObject.id
    if (!this.childs[newKey]) {
      if (key) gameObject.refKey = key
      gameObject.parent = this
      this.childs[newKey] = gameObject
    }
  }

  // recursive func to find child within the entire tree
  findChilds (condition, gameObject) {
    if (!condition) condition = () => true
    let list = []

    const { childs } = gameObject || this // start from root

    if (gameObject && condition(gameObject)) list = [gameObject]
    Object.keys(childs).forEach((key) => {
      const go = childs[key]
      list = [...list, ...this.findChilds(condition, go)]
    })

    return list
  }

  removeChild (gameObject) {
    const key = Object.keys(this.childs).find((key) => this.childs[key].id === gameObject.id)
    if (key) delete this.childs[key]
  }

  addComponent (Component, options = {}) {
    const { name } = Component
    const newComponent = new Component(options)
    const component = this.components[name]
    if (!component) {
      newComponent.gameObject = this
      this.components[name] = newComponent
      if (typeof newComponent.init === 'function') newComponent.init()
      return newComponent
    }

    console.warn(`Component [${name}] already added.`)
  }

  getComponent (Component) {
    return this.components[Component.name]
  }

  requiredComponent (...Components) {
    Components.forEach((Component) => {
      if (Array.isArray(Component)) return this.requiredComponent(Component)
      const { name } = Component
      if (!this.components[name]) throw new Error(`Component [${name}] is required for [${this.constructor.name}]`)
    })
  }

  removeComponent (Component) {
    const { name } = Component.name
    if (this.components[name]) delete this.components[name]
  }
}

export default GameObject
