import { h, Fragment } from 'preact'
import { Component } from 'preact/compat'
import PropTypes from 'prop-types'

import Select from './Select'
import TabObject from './TabObject'
import ComponentEditor from './ComponentEditor'

import styles from './styles.module.css'

export default class GameObjectEditor extends Component {
  static propTypes = {
    gameObject: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    const { game } = props
    this.state = {
      root: game,
      currentObj: game,
      currentTab: 'gameobject',
      canDrag: false
    }
  }

  // shouldComponentUpdate = () => false

  componentDidMount () {
    const stringPos = localStorage.getItem('editor_pos')
    if (stringPos) {
      const { top, left } = JSON.parse(stringPos)
      this.ui.style.top = top
      this.ui.style.left = left
    }

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

  savePosition () {
    const { top, left } = this.ui.style
    localStorage.setItem('editor_pos', JSON.stringify({ left, top }))
  }

  clampEditorToScreen = () => {
    const { x, y, width, height } = this.ui.getBoundingClientRect()

    let nx = x
    let ny = y

    if (x + width >= window.innerWidth) nx = window.innerWidth - width
    if (y + height >= window.innerHeight) ny = window.innerHeight - height

    if (ny < 0) ny = 0
    this.ui.style.top = `${ny}px`
    this.ui.style.left = `${nx}px`
    this.savePosition()
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
    if (!this.canDrag) return

    const { x, y } = e
    const nx = x - this.startX
    const ny = y - this.startY

    this.ui.style.top = `${ny}px`
    this.ui.style.left = `${nx}px`
  }

  startDrag = (e) => {
    // Compute click grap offset
    const { x, y } = this.ui.getBoundingClientRect()
    this.startX = e.x - x
    this.startY = e.y - y
    this.canDrag = true
  }

  quitDrag = () => {
    const { top, left } = this.ui.style
    localStorage.setItem('editor_pos', JSON.stringify({ left, top })) // save editor position
    this.canDrag = false
  }

  render = (props, state) => {
    const { currentTab, currentObj, root } = state
    const { parent, key, tag, gameObjects, components, editorRender } = currentObj

    return <div class={styles.ui} ref={(node) => (this.ui = node)}>
      <div class={styles.grab} onMouseDown={this.startDrag} />
      <div key='root' class={styles.properties}>
        <label>Root</label>
        <Select
          items={root.findGameObjects()}
          display={(item) => item.displayName()}
          onChange={(item) => {
            this.setState({ currentObj: item })
          }}
        />
        <label>Total gameobjects</label>
        <span>{root.findGameObjects().length}</span>
        <label>Update Loop</label>
        <div>
          <button onClick={() => root.engine.start()}>Start</button>
          <button onClick={() => {
            root.engine.stop()
            this.forceUpdate()
          }}>Stop</button>
          <button onClick={() => root.engine.reset()}>Reset</button>
        </div>
      </div>
      <TabObject name='GameObject' obj={currentObj} onTabClick={() => (this.setTab('gameobject'))} />
      {
        currentTab === 'gameobject' && <div key={key} class={styles.properties}>
          {parent && <input type='button' onClick={() => (this.setState({ currentObj: parent }))} value='Go to parent' />}
          <Fragment>
            <label>Childrens</label>
            <Select
              items={gameObjects}
              display={(item) => item.displayName()}
              onChange={(item) => {
                this.setState({ currentObj: item })
              }}
            />
          </Fragment>
          <div>
            <label>Key</label>
            <span style={{ wordBreak: 'normal' }}>{key}</span>
            <label>Tag</label>
            <input type='text' value={tag || ''} onChange={(e) => (currentObj.tag = e.target.value)} />
          </div>
          <label>Layer / Index</label>
          {/*<div>
            <select value={currentObj.layer} onChange={(e) => (currentObj.layer = e.target.value)}>
              {GameObject.layers.map((layer) => <option key={layer} value={layer}>{layer}</option>)}
            </select>
            <input type='number' value={currentObj.index} step={1} onChange={(e) => (currentObj.index = e.target.valueAsNumber)} />
          </div>*/}

        </div>
      }
      {
        typeof editorRender === 'function' &&
        <Fragment>
          <TabObject name='Properties' obj={currentObj} showEnabled={false} onTabClick={() => (this.setTab('properties'))} />
          {currentTab === 'properties' && <div class={styles.properties}>{editorRender(styles)}</div>}
        </Fragment>
      }
      {components.map((component) => <ComponentEditor key={component.name} component={component} currentTab={currentTab} onTabClick={() => (this.setTab(component.name))} />)}
    </div >
  }
}
