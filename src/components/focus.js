import GameComponent from '../gameComponent'
import Box from './box'

export default class Focus extends GameComponent {
  constructor () {
    super('focus')
  }

  onAdd = () => {
    this.gameObject.requiredComponent(Box)
  }

  render () {

  }
}
