const data = {}

export function load ({ name, path, keys }) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = path
    image.onload = () => {
      const canvas = new OffscreenCanvas(image.width, image.height)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0)
      data[name] = { image: canvas, keys }

      resolve()
    }
  })
}

// manifest = array of [{ name, path, keys }]
export function loadAll (manifest) {
  return Promise.all(manifest.map((d) => load(d)))
}

export function draw (ctx, name, ...args) {
  const dataImage = data[name]
  if (dataImage) ctx.drawImage(dataImage.image, ...args)
}

export function drawFromKey (ctx, name, key, ...args) {
  const dataImage = data[name]
  if (dataImage) {
    const dataKey = dataImage.keys[key]
    if (dataKey) {
      let { x, y, w, h } = dataKey
      if (w && !h) h = w
      if (h && !w) w = h
      ctx.drawImage(dataImage.image, x, y, w, h, ...args)
    }
  }
}

// ox = offsetX, oy = offsetY, i = index, w = boxWidth, h = boxHeight 
export function drawFromIndex (ctx, name, { ox = 0, oy = 0, w, h, i, dx = 0, dy = 0, dw, dh } = {}) {
  draw(ctx, name, ox + (i * w), oy, w, h, dx, dy, dw, dh)
}

// v = vertical slice amount
// h = horizontal slice amount
// s = spacing between slice 

// sliceImage(img, 10, 0, 2)
export function sliceImage (image, v, h, s) {
  const { width, height } = image
  const p1 = v === 0 ? width : width / v
  const p2 = h === 0 ? height : height / h

  const canvas = new OffscreenCanvas(width + (p1 * v), height + (p2 * h))
  const ctx = canvas.getContext('2d')

  for (let vi = 0; vi <= v; vi++) {
    for (let hi = 0; hi <= h; hi++) {
      const t1 = vi * p1
      const t2 = hi * p2
      ctx.drawImage(image, t1, t2, p1, p2, t1 + (s * vi), t2 + + (s * hi), p1, p2)
    }
  }

  return canvas
}

export default { draw, drawFromKey, drawFromIndex, load, loadAll, sliceImage }