import { getLocalStorage, setLocalStorage } from '../helpers'
import { setElClass, createTabEl, setElValue, newEl, createDraggableEl, setElPosition } from '../ui'
import styles from './styles.css'

export function inspectorTab (options) {
  const { title, ...restOptions } = options
  const el = createTabEl(restOptions)

  const elTitle = newEl('div')
  setElValue(elTitle, title)
  el.tab.append(elTitle)

  setElClass(el.tab, styles.tab)
  setElClass(el.container, styles.tabContent)

  return el
}

export function checkableInspectorTab (options) {
  const { onCheck, ...restOptions } = options
  const obj = inspectorTab(restOptions)

  const checkbox = newEl('input')
  checkbox.type = 'checkbox'
  checkbox.addEventListener('click', (e) => {
    e.stopPropagation()
    if (onCheck) onCheck(e.target.checked)
  })

  obj.checkbox = checkbox
  obj.tab.append(checkbox)

  return obj
}

export function dividerEl () {
  const el = newEl('div')
  setElClass(el, styles.divider)
  return el
}

export function windowEl ({ title }) {
  const posKey = `${title.toLowerCase()}_pos`
  const onDragFinish = ({ x, y }) => {
    setLocalStorage(posKey, { x, y }) // save position
  }

  const { container, box, dragArea } = createDraggableEl({ onDragFinish })

  let boxPos = getLocalStorage(posKey, { x: 0, y: 0 })
  setElPosition(box, boxPos.x, boxPos.y)
  setElClass(container, styles.container)
  setElClass(box, styles.inspector)
  setElClass(dragArea, styles.dragArea)

  const mainTab = inspectorTab({ title })

  container.append(mainTab.box)
  return {
    container,
    box,
    mainTab
  }
}