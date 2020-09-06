import { h, Fragment } from 'preact'
import { Component } from 'preact/compat'
import PropTypes from 'prop-types'

import TabObject from './TabObject'
import ComponentEditor from './ComponentEditor'

import styles from './styles.module.css'
import GameObject from '../../gameObject'

const renderOption = (obj, indent = 1) => {
  const { id, gameObjects } = obj
  let opt = [<option key={id} value={id}>{Array(indent).join('-') + obj.displayName()}</option>]

  if (gameObjects.length > 0) {
    indent += 1
    opt = [...opt, gameObjects.map((gameObject) => renderOption(gameObject, indent))]
  }

  return opt
}

const findGameObjectDeep = (gameObject, findId) => {
  const { gameObjects, id } = gameObject
  if (id === findId) return gameObject

  for (let i = 0; i < gameObjects.length; i++) {
    const childGameObject = gameObjects[i]
    if (childGameObject.id === findId) return childGameObject
    const foundGameObject = findGameObjectDeep(childGameObject, findId)
    if (foundGameObject) return foundGameObject
  }

  return null
}

export default class GameObjectEditor extends Component {
  static propTypes = {
    gameObject: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    const stringPos = localStorage.getItem('editor_pos')
    let pos = { top: 0, left: 0 }
    if (stringPos) pos = JSON.parse(stringPos)

    const { gameObject } = props
    this.state = {
      root: gameObject,
      currentObj: gameObject,
      currentTab: 'gameobject',
      canDrag: false,
      ...pos
    }
  }

  componentDidMount () {
    this.clampEditorToScreen()
    document.addEventListener('mousemove', this.drag)
    document.addEventListener('mouseup', this.quitDrag)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    document.removeEventListener('mousemove', this.drag)
    document.removeEventListener('mouseup', this.quitDrag)
    window.removeEventListener('resize', this.resize)
  }

  resize = (e) => {
    this.clampEditorToScreen()
  }

  clampEditorToScreen = () => {
    const { x, y, width, height } = this.ui.getBoundingClientRect()

    let nx = x
    let ny = y

    if (x + width >= window.innerWidth) nx = window.innerWidth - width
    if (y + height >= window.innerHeight) ny = window.innerHeight - height

    if (ny < 0) ny = 0
    this.setPosition(nx, ny)
  }

  setTab = (key) => {
    const { currentTab } = this.state
    if (currentTab === key) this.setState({ currentTab: '' })
    else this.setState({ currentTab: key })

    // Muliple tabs open
    /*
        const { tabs } = this.state
    const tab = tabs.find((tab) => tab === key)
    if (tab) this.setState({ tabs: tabs.filter((tab) => tab !== key) })
    else this.setState({ tabs: [...tabs, key] })
    */
  }

  drag = (e) => {
    const { canDrag, startX, startY } = this.state
    if (!canDrag) return

    const { x, y } = e
    const nx = x - startX
    const ny = y - startY

    this.setPosition(nx, ny)
  }

  setPosition = (left, top) => {
    localStorage.setItem('editor_pos', JSON.stringify({ left, top }))
    this.setState({ left, top })
  }

  startDrag = (e) => {
    // Compute click grap offset
    const { x, y } = this.ui.getBoundingClientRect()
    const sx = e.x - x
    const sy = e.y - y

    this.setState({ canDrag: true, startX: sx, startY: sy })
  }

  quitDrag = () => {
    this.setState({ canDrag: false })
  }

  render = (props, state) => {
    const { currentTab, currentObj, root, engine } = state
    const { parent, id, tag, gameObjects, components } = currentObj

    return <div class={styles.ui} style={{ top: this.state.top, left: this.state.left }} ref={(node) => (this.ui = node)}>
      <div class={styles.grab} onMouseDown={this.startDrag} />
      <div key='root' class={styles.properties}>
        <label>Root</label>
        <select value={currentObj.id} onChange={(e) => {
          const { value } = e.target
          const gameObject = findGameObjectDeep(root, value)
          if (gameObject) this.setState({ currentObj: gameObject })
        }}>
          {!this.state.canDrag && renderOption(root)}
        </select>
        <label>Update Loop</label>
        <div>
          <button disabled={root.engine.updating} onClick={() => root.engine.start()}>Start</button>
          <button disabled={!root.engine.updating} onClick={() => {
            root.engine.stop()
            this.forceUpdate()
          }}>Stop</button>
          <button onClick={() => root.engine.reset()}>Reset</button>
        </div>
      </div>
      <TabObject name={`GameObject [${currentObj.displayName()}]`} obj={currentObj} onTabClick={() => (this.setTab('gameobject'))} />
      {currentTab === 'gameobject' && <div key={id} class={styles.properties}>
        {parent && <input type='button' onClick={() => (this.setState({ currentObj: parent }))} value='Go to parent' />}
        {gameObjects.length > 0 && <Fragment>
          <label>Childrens</label>
          <select value onChange={(e) => {
            const { value } = e.target
            const item = gameObjects.find(({ id }) => id === value)
            if (item) this.setState({ currentObj: item })
          }}>
            <option disabled value> -- select child gameobject -- </option>
            {
              !this.state.canDrag && gameObjects.map((gameObject) => {
                return <option key={gameObject.id} value={gameObject.id}>{gameObject.displayName()}</option>
              })
            }
          </select>
        </Fragment>}
        <label>Id</label>
        <span>{id}</span>
        <label>Tag</label>
        <input type='text' value={tag || ''} onChange={(e) => (currentObj.tag = e.target.value)} />
        <label>Layer / Index</label>
        <div>
          <select value={currentObj.layer} onChange={(e) => (currentObj.layer = e.target.value)}>
            {GameObject.layers.map((layer) => <option key={layer} value={layer}>{layer}</option>)}
          </select>
          <input type='number' value={currentObj.index} step={1} onChange={(e) => (currentObj.index = e.target.valueAsNumber)} />
        </div>
      </div>}
      {components.map((component) => <ComponentEditor key={component.name} component={component} currentTab={currentTab} onTabClick={() => (this.setTab(component.name))} />)}
    </div>
  }
}
