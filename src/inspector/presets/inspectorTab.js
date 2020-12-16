import { setElClass, createTabEl, setElValue, newEl } from '../../ui'
import styles from '../styles.css'

export function inspectorTab (options) {
  const { title, ...restOptions } = options
  const el = createTabEl(restOptions)

  const elTitle = newEl('div')
  setElValue(elTitle, title)
  el.tab.append(elTitle)

  setElClass(el.tab, styles.tab)
  setElClass(el.container, styles.tabContent)

  return el
}

export function checkableInspectorTab (options) {
  const { onCheck, ...restOptions } = options
  const obj = inspectorTab(restOptions)

  const checkbox = newEl('input')
  checkbox.type = 'checkbox'
  checkbox.addEventListener('click', (e) => {
    e.stopPropagation()
    if (onCheck) onCheck(e.target.checked)
  })

  obj.checkbox = checkbox
  obj.tab.append(checkbox)

  return obj
}