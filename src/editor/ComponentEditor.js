import { h, Fragment } from 'preact'
import { Component } from 'preact/compat'

import TabObject from './TabObject'
import styles from './styles.module.css'

export default class ComponentEditor extends Component {
  render (props) {
    const { currentTab, component, onTabClick } = props
    const { editorRender, name } = component

    const render = () => {
      if (name === currentTab) {
        if (typeof editorRender === 'function') return <div class={styles.properties}>{editorRender(styles)}</div>
        return <div key={name} class={styles.properties}><span>No definition for this component</span></div>
      }

      return null
    }

    return <Fragment>
      <TabObject name={name} obj={component} onTabClick={onTabClick} />
      {render()}
    </Fragment>
  }
}
