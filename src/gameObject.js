import shortid from 'shortid'
import GameComponent from './gameComponent'

export default class GameObject {
  constructor ({ id, tag, x, y, s, r } = {}) {
    this.id = id || shortid.generate()
    this.tag = tag || null

    this.parent = null
    this.gameObjects = []
    this.components = []

    this.canRender = true
    this.canUpdate = true
  }

  displayName () {
    if (this.tag) return `${this.id} [${this.tag}]`
    return this.id
  }

  domRender () {
    const dom = []
    this.components.forEach((component) => {
      const { domRender } = component
      if (domRender && typeof domRender === 'function') dom.push(domRender())
    })

    this.gameObjects.forEach((gameObject) => {
      dom.push(gameObject.domRender())
    })

    return dom
  }

  __update () {
    if (!this.canUpdate) return

    if (this.update && typeof this.update === 'function') this.update()
    this.components.forEach((component) => component.__update())
    this.gameObjects.forEach((gameObject) => gameObject.__update())
  }

  __render (args) {
    if (!this.canRender) return

    const { ctx } = args
    ctx.save()
    if (this.render && typeof this.render === 'function') this.render(args)
    this.components.forEach((component) => component.__render(args))
    this.gameObjects.forEach((gameObject) => gameObject.__render(args))
    ctx.restore()
  }

  spawn (ObjOrType, ...args) {
    let gameObject = ObjOrType
    if (typeof ObjOrType === 'function') gameObject = new ObjOrType(args)

    if (gameObject instanceof GameObject) {
      gameObject.parent = this
      const { onSpawn } = gameObject
      if (onSpawn && typeof onSpawn === 'function') onSpawn()

      this.gameObjects.push(gameObject)
    }

    return gameObject
  }

  destroy () {
    if (this.parent) {
      const self = this.parent.getGameObject({ id: this.id, returnWithIndex: true })
      const { gameObject, index } = self
      const { onDestroy } = gameObject
      if (onDestroy && typeof onDestroy === 'function') onDestroy()

      this.parent.gameObject.splice(index, 1)
    } else throw new Error('Cannot destroy itself. This gameobject does not have a parent.')
  }

  getGameObject ({ id, tag, Type, returnWithIndex = false }) {
    let found = null
    for (let i = 0; i < this.gameObjects.length; i++) {
      const gameObject = this.gameObjects[i]
      if (
        (id && gameObject.id === id) ||
        (tag && gameObject.tag === tag) ||
        (Type && gameObject instanceof Type)
      ) {
        if (returnWithIndex) found = { index: i, gameObject }
        else found = gameObject
        break
      }
    }

    return found
  }

  getComponent (nameOrType, returnWithIndex = false) {
    const index = this.components.findIndex((component) => {
      if (typeof nameOrType === 'function') {
        return component instanceof nameOrType
      }

      return component.name === nameOrType
    })

    if (index !== -1) {
      const component = this.components[index]
      if (returnWithIndex) return { component, index }
      return component
    }

    return null
  }

  hasComponent (Type) {
    const component = this.getComponent(Type)
    if (component) return true
    return false
  }

  requiredComponent (Type) {
    if (this.hasComponent(Type)) return
    throw new Error(`Component [${Type.name}] is required.`)
  }

  addComponent (ComponentOrType, ...args) {
    let component = ComponentOrType
    if (typeof ComponentOrType === 'function') component = new ComponentOrType(...args)

    if (component instanceof GameComponent) {
      const { name, onAdd } = component
      const found = this.getComponent(name)
      if (found) throw new Error(`Component ${name} already exists.`)

      component.gameObject = this
      if (onAdd && typeof onAdd === 'function') onAdd()
      this.components.push(component)
    }

    return component
  }

  removeComponents (nameOrType) {
    const found = this.getComponent(nameOrType, true)
    if (found) {
      const { component, index } = found
      const { onRemove } = component
      if (onRemove && typeof onRemove === 'function') onRemove()
      component.gameObject = null
      this.components.splice(index, 1)
    }

    throw new Error(`Component ${nameOrType} not found.`)
  }

  clearComponents () {
    this.components = []
  }
}
