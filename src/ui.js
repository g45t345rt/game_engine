function valueToArray (value) {
  if (!value) return []
  if (Array.isArray(value)) return value
  return [value]
}

const CACHE_KEY = '__cache'
const checkElCacheObj = (el) => {
  if (!el[CACHE_KEY]) el[CACHE_KEY] = {}
}

function setElCache (el, key, value) {
  checkElCacheObj()
  el[CACHE_KEY][key] = value
}

function getElCache (el, key) {
  checkElCacheObj()
  return el[CACHE_KEY][key]
}

function renderFunc (funcOrValue) {
  if (typeof funcOrValue === 'function') {
    const newValue = funcOrValue()
    return renderFunc(newValue)
  }

  return renderFunc
}

export function setElPosition (el, x, y) {
  el.style.top = `${y}px`
  el.style.left = `${x}px`
}

export function setElClass (el, classes) {
  valueToArray(classes).forEach((c) => el.classList.add(c))
}

const valueTags = ['INPUT', 'TEXTAREA']
export function setElValue (el, value, html = false) {
  if (valueTags.indexOf(el.tagName) !== -1) {
    el.value = value
    return
  }

  if (html) {
    el.innerHTML = value
    return
  }

  el.textContent = value
}

export function setEl (elements, func, ...args) {
  valueToArray(elements).forEach((el) => func(el, ...args))
}

export function emptyEl (el) {
  while(el.firstChild) {
    el.removeChild(el.lastChild)
  }
}

export function hideEl (el) {
  setElCache(el, 'display', el.style.display)
  el.style.display = 'none'
}

export function showEl (el) {
  if (el.style.display === 'none') {
    const display = getElCache(el, 'display')
    if (display) el.style.display = display
    else el.style.display = 'block'
  }
}

export const newEl = (tag) => document.createElement(tag)

export function createDraggableEl () {
  const box = document.createElement('div')
  box.style.position = 'fixed'
  
  const dragArea = document.createElement('div')

  let startX, startY
  let mouseDrag = false
  const LEFT_CLICK = 0
  dragArea.addEventListener('mousedown', (e) => {
    if (e.button === LEFT_CLICK && !mouseDrag) { // left click
      mouseDrag = true
      box.style.userSelect = 'none'
      startX = e.clientX - box.offsetLeft
      startY = e.clientY - box.offsetTop
    }
  })

  dragArea.addEventListener('mouseup', (e) => {
    if (e.button === LEFT_CLICK) {
      box.style.userSelect = 'auto'
      mouseDrag = false
    }
  })

  document.addEventListener('mousemove', (e) => {
    if (mouseDrag) {
      setElPosition(box, e.clientX - startX, e.clientY - startY)
    }
  })

  const container = document.createElement('div')

  box.append(dragArea, container)

  return {
    box,
    dragArea,
    container
  }
}
