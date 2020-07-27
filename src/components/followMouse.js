import GameComponent from '../gameComponent'
import Transform from './transform'

export default class FollowMouse extends GameComponent {
  constructor () {
    super('followMouse')

    this.mouseX = 0
    this.mouseY = 0
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Transform)
    document.addEventListener('mousemove', this.mouseMove)
  }

  onRemove = () => {
    document.removeEventListener('mousemove', this.mouseMove)
  }

  mouseMove = (e) => {
    this.mouseX = e.clientX
    this.mouseY = e.clientY
  }

  update () {
    const speed = 2

    const transform = this.gameObject.getComponent(Transform)

    const x = this.mouseX - transform.x
    const y = this.mouseY - transform.y
    transform.rotation = Math.atan2(y, x)
    const right = transform.right(speed)
    transform.x = right.x
    transform.y = right.y
  }
}
