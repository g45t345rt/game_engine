import * as React from 'preact'
import PropTypes from 'prop-types'
import { Component } from 'preact/compat'
import styles from './styles.module.css'

export default class TabObject extends Component {
  static propTypes = {
    onTabClick: PropTypes.func
  }

  handleTabClick = (e) => {
    const { onTabClick } = this.props
    if (e.target instanceof HTMLInputElement) return

    if (onTabClick && typeof onTabClick === 'function') onTabClick()
  }

  render (props) {
    const { name, obj } = props
    const { canRender, canUpdate, update, render } = obj

    const tabName = `tab_${name}`
    const hasUpdate = typeof update === 'function'
    const hasRender = typeof render === 'function'

    return <div key={tabName} className={styles.tab} onClick={this.handleTabClick}>
      <div>{name}</div>
      <div>
        {hasRender && <React.Fragment>
          <span>R: </span>
          <input type="checkbox" checked={canRender} title="Render" onChange={(e) => (obj.canRender = e.target.checked)} />
        </React.Fragment>}
        {hasUpdate && <React.Fragment>
          <span>U: </span>
          <input type="checkbox" checked={canUpdate} title="Update" onChange={(e) => (obj.canUpdate = e.target.checked)} />
        </React.Fragment>}
      </div>
    </div>
  }
}
