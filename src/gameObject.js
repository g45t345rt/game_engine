import shortid from 'shortid'
import GameComponent from './gameComponent'
import Dispatch from './dispatch'

export default class GameObject extends Dispatch {
  static layers = ['pre', 'default', 'post']
  #socket = null
  #socketServer = null

  constructor ({ id, tag, explicitRender, index, layer } = {}) {
    super()

    this.id = id || shortid.generate()
    this.tag = tag || null

    this.parent = null
    this.gameObjects = []
    this.components = []

    this.explicitRender = explicitRender || false

    this.layer = layer || 'default'
    this.index = index || 0

    this.isClient = typeof window !== 'undefined'
  }

  displayName () {
    if (this.tag) return `${this.id} [${this.tag}]`
    return this.id
  }

  static dispatchSortOrder (gameObjects) {
    // sorting by index
    gameObjects.sort((r1, r2) => r1.index - r2.index)

    // sorting render layers
    gameObjects.sort((r1, r2) => {
      return GameObject.layers.indexOf(r1.layer) - GameObject.layers.indexOf(r2.layer)
    })
  }

  set socket (ws) { this.#socket = ws }

  get socket () {
    if (this.#socket) return this.#socket
    if (this.parent) return this.parent.socket
    return null
  }

  set socketServer (wss) { this.#socketServer = wss }

  get socketServer () {
    if (this.#socketServer) return this.#socketServer
    if (this.parent) return this.parent.socketServer
    return null
  }

  dispatch (funcName, args, options) {
    const force = (options && options.force) || false
    const results = []
    if (funcName === 'render' && this.explicitRender && !force) return

    if (this.enabled) {
      if (funcName === 'render') args.ctx.save()

      this.components.forEach((component) => {
        const result = component.dispatch(funcName, args)
        if (result) results.push(result)
      })

      const result = super.dispatch(funcName, args)
      if (result) results.push(result)

      GameObject.dispatchSortOrder(this.gameObjects)
      this.gameObjects.forEach((gameObject) => {
        const result = gameObject.dispatch(funcName, args)
        if (result && result.length > 0) results.push(result)
      })

      if (funcName === 'render') args.ctx.restore()
    }

    return results
  }

  findGameObjects (condition, child) {
    if (!condition) condition = () => true
    let list = []

    const { gameObjects } = child || this

    if (child && condition(child)) list = [child]
    gameObjects.forEach((gameObject) => {
      list = [...list, ...this.findGameObjects(condition, gameObject)]
    })

    return list
  }

  spawn (ObjOrType, ...args) {
    let gameObject = ObjOrType
    if (typeof ObjOrType === 'function') gameObject = new ObjOrType(...args)

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

  addGameObject (gameObject) {
    gameObject.parent = this
    this.gameObjects.push(gameObject)
  }

  getGameObject ({ id, tag, Type, returnWithIndex = false, multiple = false }) {
    let found = multiple ? [] : null
    for (let i = 0; i < this.gameObjects.length; i++) {
      const gameObject = this.gameObjects[i]
      if (
        (id && gameObject.id === id) ||
        (tag && gameObject.tag === tag) ||
        (Type && gameObject instanceof Type)
      ) {
        let foundObject = gameObject
        if (returnWithIndex) foundObject = { index: i, gameObject }

        if (multiple) found.push(foundObject)
        else {
          found = foundObject
          break
        }
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
    if (ComponentOrType.clientOnly && !this.isClient) return

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
