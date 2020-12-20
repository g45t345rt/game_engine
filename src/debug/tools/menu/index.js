import { hideEl, newEl, setElClass, setElValue, showEl } from '../../../ui'
import styles from './styles.css'

function checkableItem (title, el) {
  const item = newEl('div')
  setElClass(item, styles.checkableItem)
  const text = newEl('div')
  setElValue(text, title)
  const checkbox = newEl('input')
  checkbox.type = 'checkbox'

  checkbox.addEventListener('click', (e) => {
    const { checked } = e.target
    if (checked) showEl(el)
    else hideEl(el)
  })

  item.append(text, checkbox)
  return item
}

export default function createMenu ({ inspector, hierarchy }) {
  const menu = newEl('div')
  setElClass(menu, styles.menu)

  const title = newEl('div')
  setElClass(title, styles.menuTitle)
  setElValue(title, 'Debug')

  const views = newEl('div')

  const inspectorItem = checkableItem('Inspector', inspector.box)
  const hierarchyItem = checkableItem('hierarchy', hierarchy.box)
  views.append(inspectorItem, hierarchyItem)

  menu.append(title, views)

  document.body.append(menu)
}