import { getLocalStorage, setLocalStorage } from '../helpers'
import { setElClass, createTabEl, setElValue, newEl, createDraggableEl, setElPosition, getElValue, emptyEl } from '../ui'
import styles from './styles.css'

export function windowTabEl (options) {
  const tab = createTabEl(options)
  setElClass(tab.head, styles.tabHead)
  setElClass(tab.container, styles.tabContent)

  const title = newEl('div')
  tab.head.append(title)
  tab.title = title

  return tab
}

export function checkableWindowTabEl (options = {}) {
  const { onChecked } = options 
  const tab = windowTabEl(options)

  const checkbox = newEl('input')
  checkbox.type = 'checkbox'
  checkbox.addEventListener('click', (e) => {
    e.stopPropagation()
    if (onChecked) onChecked(e.target.checked)
  })

  tab.head.append(checkbox)
  tab.checkbox = checkbox

  return tab
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

export function windowEl (key) {
  const posKey = `${key}_pos`
  const onDragFinish = ({ x, y }) => {
    setLocalStorage(posKey, { x, y }) // save position
  }

  const draggable = createDraggableEl({ onDragFinish })

  let boxPos = getLocalStorage(posKey, { x: 0, y: 0 })
  setElPosition(draggable.box, boxPos.x, boxPos.y)

  setElClass(draggable.container, styles.container)
  setElClass(draggable.box, styles.window)
  setElClass(draggable.dragArea, styles.dragArea)

  const windowTab = windowTabEl()
  draggable.windowTab = windowTab

  draggable.container.append(windowTab.box)
  return draggable
}