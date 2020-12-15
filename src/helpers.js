export const inRect = (x, y, rx, ry, rw, rh) => (x >= rx && x <= (rx + rw) && y >= ry && y <= (ry + rh)) // insideRectangle
export const angle = (radian) => radian * Math.PI / 180
export const radian = (angle) => angle / 180 * Math.PI
export const originPoint = ({ ox, oy, w, h }) => ({ x: ox * w, y: oy * h })

export const callFunc = (obj, funcName, ...args) => obj && obj[funcName] && obj[funcName](...args)
export const callFuncObjects = (obj, funcName, ...args) => Object.keys(obj).forEach((k) => callFunc(obj[k], funcName, ...args))

// lw = lineWidth, stroke = outlined, center, inset
export const drawStrokeRect = (ctx, { x = 0, y = 0, w, h, lw, stroke = 'outlined' }) => {
  ctx.lineWidth = lw

  if (stroke === 'center') {
    const center = (lw / 2)
    x += center
    y += center
    w -= center * 2
    h -= center * 2
  }

  if (stroke === 'inset') {
    x += lw
    y += lw
    w -= lw * 2
    h -= lw * 2
  }

  ctx.strokeRect(x, y, w, h)
}