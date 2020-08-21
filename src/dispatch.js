export const DispatchType = {
  Both: 'both',
  Client: 'client',
  Server: 'server'
}

export default class Dispatch {
  constructor () {
    this.dispatchType = DispatchType.Both
    this.enabled = true
    this.disabledFuncs = []
    this.isClient = typeof window !== 'undefined'
  }

  toggleFunc (funcName) {
    const index = this.disabledFuncs.indexOf(funcName)
    if (index === -1) this.disableFunc(funcName)
    else this.enableFunc(funcName)
  }

  enableFunc (funcName) {
    this.disabledFuncs = this.disabledFuncs.filter((fn) => fn !== funcName)
  }

  disableFunc (funcName) {
    const index = this.disabledFuncs.indexOf(funcName)
    if (index === -1) this.disabledFuncs = [...this.disabledFuncs, funcName]
  }

  canDispatch (funcName) {
    if (!this[funcName]) return false
    if (typeof this[funcName] !== 'function') return false
    if (!this.enabled) return false
    if (this.disabledFuncs.indexOf(funcName) !== -1) return false

    if (this.dispatchType === DispatchType.Both) return true
    if (this.isClient && this.dispatchType === DispatchType.Client) return true
    if (!this.isClient && this.dispatchType === DispatchType.Server) return true
    return false
  }

  dispatch (funcName, args) {
    if (!this.canDispatch(funcName)) return
    return this[funcName](args)
  }
}
