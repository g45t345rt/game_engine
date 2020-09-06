import GameComponent from '../gameComponent'
import Transform from './transform'

const cache = {}

export default class Image extends GameComponent {
  constructor ({ cacheId, width, height, createImage }) {
    super('image')

    this.cacheId = cacheId
    this.width = width
    this.height = height
    this.scaleX = 1
    this.scaleY = 1
    this.createImage = createImage
  }

  initImage () {
    if (cache[this.cacheId]) {
      this.image = cache[this.cacheId]
      return
    }

    const canvas = new OffscreenCanvas(this.width * this.scaleX, this.height * this.scaleY)
    const ctx = canvas.getContext('2d')
    this.createImage(ctx)
    this.image = canvas
    cache[this.cacheId] = canvas
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Transform)
    this.initImage()
  }

  render ({ ctx }) {
    ctx.drawImage(this.image, 0, 0)
  }
}
