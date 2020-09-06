import { h, Fragment } from 'preact'
import { Component } from 'preact/compat'
import PropTypes from 'prop-types'
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
    const { canRender, canUpdate, enabled, update, render } = obj

    const tabName = `tab_${name}`
    const hasUpdate = typeof update === 'function'
    const hasRender = typeof render === 'function'

    return <div key={tabName} class={styles.tab} onClick={this.handleTabClick}>
      <div>{name}</div>
      <div>
        <Fragment>
          <span>E: </span>
          <input type='checkbox' checked={enabled} title='Render' onChange={(e) => (obj.enabled = e.target.checked)} />
        </Fragment>
        {/*
        {hasRender && <Fragment>
          <span>R: </span>
          <input type='checkbox' checked={canRender} title='Render' onChange={(e) => (obj.canRender = e.target.checked)} />
        </Fragment>}
        {hasUpdate && <Fragment>
          <span>U: </span>
          <input type='checkbox' checked={canUpdate} title='Update' onChange={(e) => (obj.canUpdate = e.target.checked)} />
        </Fragment>}*/}
      </div>
    </div>
  }
}
