import createInspector from './window/inspector'
import createHierarchy from './window/hierarchy'

export default class Editor {
  constructor (gameRoot) {
    const inspector = createInspector(gameRoot)
    const hierarchy = createHierarchy(gameRoot)
    this.window = {
      inspector
    }
  }


  update () {
      /*
    Object.keys(this.window).forEach((key) => {
      const { elements } = this.window[key]
      elements.forEach((el) => renderEl(el))
    })*/
  }
}