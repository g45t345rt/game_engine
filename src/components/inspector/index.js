import Component from '../component'
import { createSelectEl, newEl, setElValue, createDraggableEl, setElClass, setElRender, renderEl, createTabEl, setElPosition, emptyEl, hideEl } from '../../ui'
import styles from './styles.css'

function flexBoxTitle (titleValue, propEl) {
  const box = newEl('div')
  setElClass(box, styles.flexBox)

  const title = newEl('div')
  setElClass(box, styles.flexBoxTitle)
  setElValue(title, titleValue)

  box.append(title, propEl)
  return box
}

export default class Inspector extends Component {
  constructor (options) {
    super(options)

    this.elements = []
  }

  init () {
    // draggable inspector
    const onDragFinish = ({ x, y }) => {
      // save position
      localStorage.setItem('inspector_pos', JSON.stringify({ x, y }))
    }

    const { container, box, dragArea } = createDraggableEl({ onDragFinish })
    this.container = container

    let boxPos = { x: 0, y: 0 }
    try {
      boxPos = JSON.parse(localStorage.getItem('inspector_pos'))
    } catch { }
    setElPosition(box, boxPos.x, boxPos.y)
    setElClass(container, styles.container)
    setElClass(box, styles.box)
    setElClass(dragArea, styles.dragArea)

    // title
    const title = newEl('div')
    setElClass(title, styles.title)
    setElValue(title, 'Inspector')

    // total gameobjects
    const totalGameObjects = newEl('div')
    setElRender(totalGameObjects, () => this.gameObject.findChilds().length)
    const totalGoBox = flexBoxTitle('Total gameobjects', totalGameObjects)

    // toggle play/stop loop
    const toggleInput = newEl('input')
    setElRender(toggleInput, () => {
      return this.gameObject.canUpdate ? 'stop' : 'play'
    })
    toggleInput.type = 'button'
    toggleInput.addEventListener('click', () => {
      const { canUpdate } = this.gameObject
      this.gameObject.canUpdate = !canUpdate
      renderEl(toggleInput)
    })

    // reset game
    const resetInput = newEl('input')
    resetInput.type = 'button'
    setElValue(resetInput, 'reset')

    container.append(title, totalGoBox, toggleInput, resetInput)
    this.setGameObjectTab(this.gameObject)

    document.body.append(box)

    // elements to be rendered on update
    this.elements = { ...this.elements, totalGameObjects }
  }

  setGameObjectTab (objectToInspect) {
    const gameObject = objectToInspect

    if (this.gameObjectTab) this.container.removeChild(this.gameObjectTab)

    // gameObject tab
    const goTabEl = createTabEl()
    setElClass(goTabEl.tab, styles.tab)
    setElValue(goTabEl.tab, 'GameObject')
    setElClass(goTabEl.container, styles.tabContent)

    // select childs
    const select = createSelectEl({
      items: gameObject.childs,
      onSelect: (item) => {
        this.setGameObjectTab(item)
      }
    })

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
    const idBox = flexBoxTitle('id', id)

    // tag
    const tag = newEl('input')
    tag.type = 'text'
    setElRender(tag, () => gameObject.tag)
    tag.addEventListener('input', (e) => {
      gameObject.tag = e.target.value
    })

    const tagBox = flexBoxTitle('tag', tag)

    goTabEl.container.append(select, parentInput, idBox, tagBox)

    this.gameObjectTab = goTabEl.box
    this.container.append(this.gameObjectTab)
    this.elements = { ...this.elements, id, tag, select }
  }

  update (args) {
    Object.keys(this.elements).forEach((key) => {
      const el = this.elements[key]
      renderEl(el)
    })
  }
}
