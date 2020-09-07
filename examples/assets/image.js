export default class Image {
  static cache = []
  constructor ({ id, createImage, width, height }) {
    const image = Image.cache[id]
    if (image) {
      this.image = image
    } else {
      const canvas = new OffscreenCanvas(width, height)
      const ctx = canvas.getContext('2d')

      createImage(ctx)
      this.image = canvas
      Image.cache[id] = canvas
    }
  }
}
