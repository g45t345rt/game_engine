import { getLocalStorage, setLocalStorage } from '../helpers'
import { setElClass, createTabEl, setElValue, newEl, createDraggableEl, setElPosition, getElValue, emptyEl } from '../ui'
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

export function mouseMoveEditEl (el, { onChange } = {}) {
  const lastCursor = document.body.style.cursor
  let mouseDown = false
  let startX = 0
  let startValue

  document.addEventListener('mousemove', (e) => {
    if (mouseDown) {
      const newValue = startValue + (e.clientX - startX)
      setElValue(el, newValue)
      if (typeof onChange === 'function') onChange(newValue)
    }
  })

  el.addEventListener('mousedown', (e) => {
    if (!e.target.isEqualNode(el)) return // don't trigger if inside a child

    startValue = new Number(getElValue(el))
    startX = e.clientX
    if (e.button === 0) {
      mouseDown = true
      el.style.userSelect = 'none'
      document.body.style.cursor = 'crosshair'
    }
  })

  document.addEventListener('mouseup', () => {
    if (mouseDown) {
      mouseDown = false
      el.style.userSelect = 'auto'
      document.body.style.cursor = lastCursor
    }
  })
}

export function editableEl (el, { onChange, changeOnEveryInput = true, type = 'number' }) {
  mouseMoveEditEl(el, { onChange })
  const editInput = newEl('input')
  editInput.type = type
  editInput.style.width = '70px'
  editInput.style.position = 'absolute'

  let editing = false
  let lastValue
  const startEdit = () => {
    editing = true
    el.prepend(editInput)
    editInput.focus()
    lastValue = getElValue(el)
    setElValue(editInput, lastValue)
  }

  const resetEdit = () => {
    el.removeChild(editInput)
    editing = false
    if (typeof onChange === 'function') onChange(lastValue)
  }

  const saveEdit = () => {
    el.removeChild(editInput)
    editing = false
    const value = getElValue(editInput)
    setElValue(el, value)
    if (typeof onChange === 'function') onChange(value)
  }

  document.addEventListener('mousedown', (e) => {
    if (!editing) return
    // outside click
    if (!e.target.isEqualNode(editInput)) saveEdit()
  })

  // trigger onChange on every key input
  if (changeOnEveryInput) {
    editInput.addEventListener('input', (e) => {
      if (typeof onChange === 'function') onChange(e.target.value)
    })
  }

  editInput.addEventListener('keydown', (e) => {
    // cancel edit
    if (e.code === 'Escape') resetEdit()

    // save edit
    if (e.code === 'Enter') saveEdit()
  })

  el.addEventListener('dblclick', startEdit)
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