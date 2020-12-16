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
  checkElCacheObj(el)
  el[CACHE_KEY][key] = value
}

function getElCache (el, key) {
  checkElCacheObj(el)
  return el[CACHE_KEY][key]
}

export function setElPosition (el, x, y) {
  el.style.top = `${y}px`
  el.style.left = `${x}px`
}

export function setElClass (el, classes) {
  valueToArray(classes).forEach((c) => el.classList.add(c))
}

const valueTags = ['INPUT', 'TEXTAREA']
function getTagValueKey (el, html = false) {
  if (valueTags.indexOf(el.tagName) !== -1) {
    if (el.type === 'checkbox') return 'checked'
    return 'value'
  }

  if (html) return 'innerHTML'
  return 'textContent'
}

export function setElValue (el, value, html) {
  const key = getTagValueKey(el, html)
  el[key] = value
}

export function getElValue (el, html) {
  const key = getTagValueKey(el, html)
  return el[key]
}

export function setElRender (el, func, html = false) {
  setElCache(el, 'render', { func, html })
  renderEl(el)
}

export function renderEl (el) {
  const cache = getElCache(el, 'render')
  if (!cache) throw new Error(`Render func is not set. Use setElRender.`)

  const { func, html } = cache
  const newValue = func(el)
  const currentValue = getElValue(el, html)
  // only change value if diff *** not necessary since I think dom does not set the same value
  if (newValue !== null && newValue !== undefined && newValue !== currentValue) setElValue(el, newValue, html)
}

export function emptyEl (el) {
  while (el.firstChild) {
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

export function toggleEl (el) {
  if (el.style.display === 'none') showEl(el)
  else hideEl(el)
}

export const newEl = (tag) => document.createElement(tag)

export function createTabEl ({ canToggle = true } = {}) {
  const box = newEl('div')

  const tab = newEl('div')
  tab.style.userSelect = 'none'

  const container = newEl('div')
  if (canToggle) {
    tab.style.cursor = 'pointer'
    tab.addEventListener('click', () => {
      toggleEl(container)
    })
  }

  box.append(tab, container)

  return {
    box,
    tab,
    container
  }
}

export function clampElPosition (el, { x, y, w, h }) {
  const boxRect = el.getBoundingClientRect()

  let nx = boxRect.x
  let ny = boxRect.y

  if (boxRect.x + boxRect.width >= w) nx = w - boxRect.width
  if (boxRect.y + boxRect.height >= h) ny = h - boxRect.height

  if (nx < x) nx = 0
  if (ny < y) ny = 0

  setElPosition(el, nx, ny)
}

// items can be an Array or Object
export function createSelectEl ({ items, getKey, getValue, onSelect, noSelect, emptySelect } = {}) {
  const select = newEl('select')

  function getItem (key) {
    if (Array.isArray(items)) return items.find((item) => getKey(item) === key)
    return items[key]
  }

  let noData = false
  function render () {
    let keys = []
    if (Array.isArray(items)) keys = items.map((item) => getKey(item))
    else keys = Object.keys(items)

    if (emptySelect && keys.length === 0 && select.options.length === 0) {
      const emptyOption = newEl('option')
      emptyOption.disabled = true
      emptyOption.selected = true
      emptyOption.text = emptySelect
      select.add(emptyOption)
      noData = true
    } else {
      noData = false
    }

    if (noData) return

    // check if item list changed
    const optionValues = [...select.options].map((o) => o.value)
    const sameChilds = keys.every((key) => optionValues.includes(key))
    if (sameChilds) return

    emptyEl(select)

    if (noSelect) {
      const noOption = newEl('option')
      noOption.text = noSelect
      select.add(noOption)
    }

    keys.forEach((key) => {
      const item = getItem(key)
      const option = newEl('option')
      option.text = typeof getValue === 'function' ? getValue(item) : key
      option.value = key
      select.add(option)
    })
  }

  select.addEventListener('change', (e) => {
    const option = e.target.selectedOptions[0]
    const item = getItem(option.value)
    if (onSelect) onSelect(item)
  })

  setElRender(select, render)
  return select
}

export function createDraggableEl ({ onDragFinish, clampToScreen = true } = {}) {
  const box = newEl('div')
  box.style.position = 'fixed'

  const dragArea = newEl('div')

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

      if (onDragFinish) onDragFinish({ x: e.clientX - startX, y: e.clientY - startY })
    }
  })

  document.addEventListener('mousemove', (e) => {
    if (mouseDrag) {
      setElPosition(box, e.clientX - startX, e.clientY - startY)
      if (clampToScreen) clampElPosition(box, { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight })
    }
  })

  document.addEventListener('mouseleave', () => mouseDrag = false)

  const container = newEl('div')

  box.append(dragArea, container)

  return {
    box,
    dragArea,
    container
  }
}

export function createTableEl ({ rows, columns, header = true }) {
  const table = newEl('table')
  const body = newEl('tbody')

  const elRows = []

  if (header) {
    const row = newEl('tr')

    const elCells = []
    for (let c = 0; c < columns; c++) {
      const cell = newEl('th')

      elCells.push(cell)
      row.append(cell)
    }

    elRows.push(elCells)
    body.append(row)
  }

  for (let r = 0; r < rows; r++) {
    let row = newEl('tr')

    const elCells = []
    for (let c = 0; c < columns; c++) {
      const cell = newEl('td')

      elCells.push(cell)
      row.appendChild(cell)
    }

    elRows.push(elCells)
    body.append(row)
  }

  table.append(body)

  return {
    rows: elRows,
    table
  }
}