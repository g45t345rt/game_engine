
let mouseDown = {}
let mouseX = 0
let mouseY = 0

/* Mouse */

function onMouseMove (e) {
  mouseX = e.offsetX
  mouseY = e.offsetY
}

function onMouseDown (e) {
  mouseDown[e.buttons] = true
}

function onMouseUp (e) {
  delete mouseDown[e.buttons]
}

document.addEventListener('mousedown', onMouseDown)
document.addEventListener('mouseup', onMouseUp)
document.addEventListener('mousemove', onMouseMove)

export function isMouseDown (key) {
  return mouseDown[key] ? true : false
}

/* Keyboard */
let keyDowns = {}
function onKeyDown (e) {
  keyDowns[e.code] = true
}

function onKeyUp (e) {
  delete keyDowns[e.code]
}

function clearKeys () {
  keyDowns = {}
}

document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)
document.addEventListener('blur', clearKeys)
document.addEventListener('focus', clearKeys)

export function isKeyDown (key) {
  return keyDowns[key] ? true : false
}

export function isEveryKeyDown (keys) {
  return keyDowns.every((k) => keys.includes(k))
}

export function isOnlyOneKeyDown (key) {
  return keyDowns.length === 1 && keyDowns.includes(key)
}

export default {
  isMouseDown,
  mouseX,
  mouseY,
  isKeyDown,
  isEveryKeyDown,
  isOnlyOneKeyDown
}