import Dispatch from './dispatch'

export default class GameComponent extends Dispatch {
  static clientOnly = true

  constructor (name) {
    super()

    // Unique name (gameobject cannot have identical components)
    this.name = name

    // Set if game component should use decimal points
    this.precision = false // TODO

    // Component is always reference to a gameobject
    // Populated after the component is attached to a gameobject
    this.gameObject = null
  }

  /*
    Functions called by assigned gameobject
    -- onAdd = () => {}
    -- onRemove = () => {}
  */
}
