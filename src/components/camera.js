import { typeObject } from '../typeCheck'
import Component from '../component'
import Rect from './rect'

export class Camera extends Component {
  constructor (options) {
    super(options)

    this.render = typeObject(options.render)
  }

  init () {
    this.requiredComponent(Rect)
  }

  draw (args) {
    const rect = this.getComponent(Rect)
    const { w, h } = rect

    const { ctx } = args
    ctx.beginPath()
    ctx.rect(0, 0, w, h)
    ctx.clip()

    this.render._draw({ ...args, forceDraw: true })
  }
}

export default Camera