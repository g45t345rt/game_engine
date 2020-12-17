import { createSelectEl, newEl, setElValue, setElClass, setElRender, renderEl, setElPosition, emptyEl, hideEl } from '../../ui'
import styles from '../styles.css'
import { inspectorTab, checkableInspectorTab, windowEl } from '../controls'

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

function setGameObjectTab (box, gameObject) {
  emptyEl(box)

  // gameObject tab
  const goTabEl = inspectorTab({ title: 'GameObject' })

  // select childs
  const select = createSelectEl({
    noSelect: 'Select a child',
    emptySelect: 'No childs',
    items: gameObject.childs,
    onSelect: (item) => {
      setGameObjectTab(box, item)
    }
  })

  const selectPropEl = propertyEl('Childs', select)

  // goto parent button
  const parentInput = newEl('input')
  parentInput.type = 'button'
  setElValue(parentInput, 'Go to parent')
  parentInput.addEventListener('click', () => {
    setGameObjectTab(box, gameObject.parent)
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

  box.append(goTabEl.box)
  //this.elements = { ...this.elements, id, tag, select }

  setComponentTabs(box, gameObject)
}

function setComponentTabs (box, gameObject) {
  const { components } = gameObject
  Object.keys(components).forEach((key) => {
    const component = components[key]
 
    const tab = checkableInspectorTab({ title: key })
    setElRender(tab.checkbox, () => component.enabled)

    if (component.inspector) {
      const { container } = component.inspector()
      tab.container.append(container)
    } else {
      const noDefinition = newEl('div')
      setElValue(noDefinition, `No definition for this component.`)
      setElClass(noDefinition, styles.noDefinition)
      tab.container.append(noDefinition)
    }

    box.append(tab.box)
  })
}

export default function createInspector (gameRoot) {
  const inspector = windowEl({ title: 'Inspector' })

  // total gameobjects
  const totalGameObjects = newEl('div')
  setElRender(totalGameObjects, () => gameRoot.findChilds().length)
  const totalGoBox = propertyEl('Total gameobjects', totalGameObjects)

  // toggle play/stop loop
  const toggleInput = newEl('input')
  setElRender(toggleInput, () => {
    return gameRoot.canUpdate ? 'stop' : 'play'
  })
  toggleInput.type = 'button'
  toggleInput.addEventListener('click', () => {
    const { canUpdate } = gameRoot
    gameRoot.canUpdate = !canUpdate
    renderEl(toggleInput)
  })

  const toggleInputPropEl = propertyEl('Game loop', toggleInput)

  inspector.mainTab.container.append(totalGoBox, toggleInputPropEl)

  const gameObjectBox = newEl('div')

  inspector.container.append(gameObjectBox)
  setGameObjectTab(gameObjectBox, gameRoot)

  document.body.append(inspector.box)

  return inspector
  // elements to be rendered on update
  //this.elements = { ...this.elements, totalGameObjects }
}