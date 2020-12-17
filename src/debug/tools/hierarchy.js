import { newEl, setElValue } from '../../ui'
import { windowEl } from '../controls'

function treeView (gameObject, parentEl) {
  const containerEl = newEl('div')
  if (!parentEl) {
    parentEl = newEl('div') // root
  } else {
    containerEl.style.marginLeft = `20px`
  }

  const { childs } = gameObject
  Object.keys(childs).forEach((key) => {
    const childEl = newEl('div')
    setElValue(childEl, key)

    containerEl.append(childEl)
    treeView(childs[key], containerEl)
  })

  if (containerEl.children.length > 0) parentEl.append(containerEl)
  return parentEl
}

export default function createHierarchy (gameObject) {
  const hierarchy = windowEl({ title: 'Hierarchy' })

  const tree = treeView(gameObject)
  hierarchy.mainTab.container.append(tree)
  document.body.append(hierarchy.box)

  return hierarchy
}