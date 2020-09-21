import { h } from 'preact'
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
    const { name, obj, showEnabled = true } = props
    const { enabled } = obj

    const tabName = `tab_${name}`

    return <div key={tabName} class={styles.tab} onClick={this.handleTabClick}>
      <div>{name}</div>
      {showEnabled && <div>
        <input type='checkbox' checked={enabled} title='Render' onChange={(e) => (obj.enabled = e.target.checked)} />
      </div>}
    </div>
  }
}
