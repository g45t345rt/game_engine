import Component from '../component'
import { newEl, setElValue, createDraggableEl, setElClass, setElRender, renderEl } from '../../ui'
import styles from './styles.css'

export default class Inspector extends Component {
  constructor (options) {
    super(options)

    this.elements = []
  }

  init () {
    const { container, box, dragArea } = createDraggableEl()
    setElClass(container, styles.container)
    setElClass(box, styles.box)
    setElClass(dragArea, styles.dragArea)

    // title
    const title = newEl('div')
    setElValue(title, 'Inspector')

    // total gameobjects
    const totalGameObjects = newEl('div')
    setElValue(totalGameObjects, 'Total gameobjects')

    // id
    const id = newEl('div')
    setElRender(id, () => this.gameObject.id)

    // tag
    const tag = newEl('input')
    tag.type = 'text'
    setElRender(tag, () => this.gameObject.tag)
    tag.addEventListener('input', (e) => {
      this.gameObject.tag = e.target.value
    })

    // toggle play/stop loop
    const toggleLoop = newEl('input')
    setElRender(toggleLoop, () => {
      return this.gameObject.canUpdate ? 'stop' : 'play'
    })
    toggleLoop.type = 'button'
    toggleLoop.addEventListener('click', () => {
      const { canUpdate } = this.gameObject
      this.gameObject.canUpdate = !canUpdate
      renderEl(toggleLoop)
    })

    container.append(title, totalGameObjects, id, tag, toggleLoop)
    document.body.append(box)

    this.elements = { id, tag }
  }

  update (args) {
    Object.keys(this.elements).forEach((key) => {
      const el = this.elements[key]
      renderEl(el)
    })
  }
}
