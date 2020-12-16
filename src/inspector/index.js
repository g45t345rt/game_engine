import { typeObject } from '../typeCheck'
import { createSelectEl, newEl, setElValue, createDraggableEl, setElClass, setElRender, renderEl, createTabEl, setElPosition, emptyEl, hideEl } from '../ui'
import styles from './styles.css'
import { inspectorTab, checkableInspectorTab } from './presets/inspectorTab'

function propertyEl (titleValue, propEl) {
  const box = newEl('div')
  setElClass(box, styles.property)

  const title = newEl('div')
  setElClass(title, styles.propertyKey)
  setElValue(title, titleValue)
  setElClass(propEl, styles.propertyValue)

  box.append(title, propEl)
  return box
}

export default class Inspector {
  constructor (root) {
    this.root = typeObject(root)
    this.elements = []

    this.setInspectorBox()
  }

  setInspectorBox () {
    // draggable inspector
    const onDragFinish = ({ x, y }) => {
      // save position
      localStorage.setItem('inspector_pos', JSON.stringify({ x, y }))
    }

    const { container, box, dragArea } = createDraggableEl({ onDragFinish })

    let boxPos = { x: 0, y: 0 }
    try {
      boxPos = JSON.parse(localStorage.getItem('inspector_pos'))
    } catch { }
    setElPosition(box, boxPos.x, boxPos.y)
    setElClass(container, styles.container)
    setElClass(box, styles.inspector)
    setElClass(dragArea, styles.dragArea)

    // title
    const mainTab = inspectorTab({ title: 'Inspector' })

    // total gameobjects
    const totalGameObjects = newEl('div')
    setElRender(totalGameObjects, () => this.root.findChilds().length)
    const totalGoBox = propertyEl('Total gameobjects', totalGameObjects)

    // toggle play/stop loop
    const toggleInput = newEl('input')
    setElRender(toggleInput, () => {
      return this.root.canUpdate ? 'stop' : 'play'
    })
    toggleInput.type = 'button'
    toggleInput.addEventListener('click', () => {
      const { canUpdate } = this.root
      this.root.canUpdate = !canUpdate
      renderEl(toggleInput)
    })

    const toggleInputPropEl = propertyEl('Game loop', toggleInput)

    mainTab.container.append(totalGoBox, toggleInputPropEl)

    this.elementBox = newEl('div')

    container.append(mainTab.box, this.elementBox)
    this.setGameObjectTab(this.root)

    document.body.append(box)

    // elements to be rendered on update
    this.elements = { ...this.elements, totalGameObjects }
  }

  setGameObjectTab (objectToInspect) {
    emptyEl(this.elementBox)

    const gameObject = objectToInspect

    // gameObject tab
    const goTabEl = inspectorTab({ title: 'GameObject' })

    // select childs
    const select = createSelectEl({
      emptySelect: 'Select a child',
      items: gameObject.childs,
      onSelect: (item) => {
        this.setGameObjectTab(item)
      }
    })

    const selectPropEl = propertyEl('Childs', select)

    // goto parent button
    const parentInput = newEl('input')
    parentInput.type = 'button'
    setElValue(parentInput, 'Go to parent')
    parentInput.addEventListener('click', () => {
      this.setGameObjectTab(gameObject.parent)
    })
    if (!gameObject.parent) hideEl(parentInput)

    // id
    const id = newEl('div')
    setElRender(id, () => gameObject.id)
    const idBox = propertyEl('id', id)

    // tag
    const tag = newEl('input')
    tag.type = 'text'
    setElRender(tag, () => gameObject.tag)
    tag.addEventListener('input', (e) => {
      gameObject.tag = e.target.value
    })

    const tagBox = propertyEl('tag', tag)

    goTabEl.container.append(parentInput, selectPropEl, idBox, tagBox)

    this.gameObjectTab = goTabEl.box
    this.elementBox.append(this.gameObjectTab)
    this.elements = { ...this.elements, id, tag, select }

    this.setComponentTabs(gameObject)
  }

  setComponentTabs (gameObjectToInspect) {
    const gameObject = gameObjectToInspect
    const { components } = gameObject
    Object.keys(components).forEach((key) => {
      const component = components[key]
      if (component instanceof Inspector) return

      const tab = checkableInspectorTab({ title: key })
      setElRender(tab.checkbox, () => component.enabled)

      const noDefinition = newEl('div')
      setElValue(noDefinition, `No definition for this component.`)
      setElClass(noDefinition, styles.noDefinition)
      tab.container.append(noDefinition)

      this.elementBox.append(tab.box)
    })
  }

  update (args) {
    Object.keys(this.elements).forEach((key) => {
      const el = this.elements[key]
      renderEl(el)
    })
  }
}
