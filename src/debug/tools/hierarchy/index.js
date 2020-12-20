import { createTreeViewEl, setElClass, setElValue } from '../../../ui'
import { windowEl } from '../../controls'
import styles from './styles.css'

export default function createHierarchy (gameObject, inspector) {
  const hierarchy = windowEl('hierarchy')
  setElValue(hierarchy.windowTab.title, 'Hierarchy')

  const tree = createTreeViewEl({
    root: gameObject,
    onSelect: (item) => inspector.setGameObject(item),
    getChilds: (item) => Object.values(item.childs),
    getText: (item) => item.name()
  })

  hierarchy.windowTab.container.append(tree)
  setElClass(hierarchy.windowTab.container, styles.hierarchy)
  document.body.append(hierarchy.box)

  return hierarchy
}