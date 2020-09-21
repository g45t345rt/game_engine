import { h, Component } from 'preact'
import styles from './styles.module.css'

export default class Select extends Component {
  state = {
    selectedItem: null,
    dropdownVisible: false
  }

  displayItem (item) {
    const { items, display, emptySelection = 'select an item', emptyText = 'no items' } = this.props
    if (item && display && typeof display === 'function') return display(item)
    if (items.length === 0) return emptyText
    return emptySelection
  }

  render (props, state) {
    const { items, onChange } = props
    const { selectedItem, dropdownVisible } = state

    return <div class={styles.select}>
      <div class={styles.box} onClick={() => this.setState({ dropdownVisible: true })}>{this.displayItem(selectedItem)}</div>
      {dropdownVisible && items.length > 0 && <div class={styles.dropdown}>
        {items.map((item) => <div class={styles.item} key={item.key} onClick={() => {
          this.setState({
            selectedItem: item,
            dropdownVisible: false
          })
          if (onChange && typeof onChange === 'function') onChange(item)
        }}>{this.displayItem(item)}</div>)}
      </div>}
    </div>
  }
}
