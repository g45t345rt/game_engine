export default class Dispatch {
  constructor () {
    this.enabled = true
    this.disabledFuncs = []
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

    return true
  }

  dispatch (funcName, args) {
    if (!this.canDispatch(funcName)) return
    return this[funcName](args)
  }
}
