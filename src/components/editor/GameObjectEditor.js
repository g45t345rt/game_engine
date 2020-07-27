import * as React from 'preact'
import { Component } from 'preact/compat'

import TabObject from './TabObject'
import ComponentEditor from './ComponentEditor'

import styles from './styles.module.css'

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
  constructor (props) {
    super(props)

    const { gameObject } = props
    this.state = {
      root: gameObject,
      currentObj: gameObject,
      currentTab: 'gameobject'
    }
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

  render = (props, state) => {
    const { currentTab, currentObj, root } = state
    const { parent, id, tag, gameObjects, components } = currentObj

    return <div className={styles.ui}>
      <div key="root" className={styles.properties}>
        <label>Root</label>
        <select value={currentObj.id} onChange={(e) => {
          const { value } = e.target
          const gameObject = findGameObjectDeep(root, value)
          if (gameObject) this.setState({ currentObj: gameObject })
        }}>
          {renderOption(root)}
        </select>
      </div>
      <TabObject name={currentObj.id} obj={currentObj} onTabClick={() => (this.setTab('gameobject'))} />
      {currentTab === 'gameobject' && <div key={id} className={styles.properties}>
        {parent && <input type="button" onClick={() => (this.setState({ currentObj: parent }))} value="Go to parent" />}
        {gameObjects.length > 0 && <React.Fragment>
          <label>Childrens</label>
          <select value onChange={(e) => {
            const { value } = e.target
            const item = gameObjects.find(({ id }) => id === value)
            if (item) this.setState({ currentObj: item })
          }}>
            <option disabled value> -- select child gameobject -- </option>
            {
              gameObjects.map((gameObject) => {
                return <option key={gameObject.id} value={gameObject.id}>{gameObject.displayName()}</option>
              })
            }
          </select>
        </React.Fragment>}
        <label>Id</label>
        <span>{id}</span>
        <label>Tag</label>
        <input type="text" value={tag || ''} onChange={(e) => (currentObj.tag = e.target.value)} />
      </div>}
      {components.map((component) => <ComponentEditor component={component} currentTab={currentTab} onTabClick={() => (this.setTab(component.name))} />)}
    </div>
  }
}

// Need this for later
{/*<label>Origin</label>
          <select value={Object.values(Origin)[[this.obj.ox, this.obj.oy]]} onChange={(e) => {
            const { value } = e.target
            this.obj.setOrigin(Origin[value])
          }}>
            {Object.keys(Origin).map((key) => {
              return <option key={key} value={key}>{key}</option>
            })}
          </select>
          <label>ox</label>
          <input type="number" value={ox} onChange={(e) => (this.obj.ox = e.target.value)} />
          <label>oy</label>
          <input type="number" value={oy} onChange={(e) => (this.obj.oy = e.target.value)} />
          <label>Origin POINT</label>
          <span>{JSON.stringify(this.obj.getOriginPoint())}</span>*/}