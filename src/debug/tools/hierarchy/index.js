import { newEl, setElClass, setElValue, toggleEl } from '../../../ui'
import { windowEl } from '../../controls'
import styles from './styles.css'

/*
function treeView (gameObject, options, containerEl, deep = -1) {
  if (!containerEl) containerEl = newEl('div')
  deep++

  const { onSelect } = options || {}
  Object.keys(gameObject.childs).forEach((key) => {
    const childEl = newEl('div')
    setElValue(childEl, key)
    setElClass(childEl, styles.item)

    const padding = deep * 20
    if (padding > 0) childEl.style.paddingLeft = `${padding}px`

    const child = gameObject.childs[key]

    if (onSelect) {
      childEl.addEventListener('click', () => {
        // deselect all
        for (let i = 0; i < containerEl.children.length; i++) {
          containerEl.children[i].classList.remove(styles.selected)
        }

        setElClass(childEl, styles.selected)
        onSelect(child)
      })
    }


    containerEl.append(childEl)
    treeView(child, options, containerEl, deep)
  })

  return containerEl
}*/

function treeView ({ root, getChilds, getText, onSelect, indent = 10 }) {
  function buildTreeView (item, parentEl, deep) {
    const childs = getChilds(item)
    if (!parentEl) parentEl = newEl('div')

    if (childs.length > 0) {
      const containerEl = newEl('div')
      childs.forEach((child) => {
        const childEl = newEl('div')
        if (deep > 0) childEl.style.paddingLeft = `${deep * indent}px`

        const valueEl = newEl('div')
        setElValue(valueEl, getText(child))
        childEl.append(valueEl)

        // collapse on doubleclick
        valueEl.addEventListener('dblclick', () => {
          const nextEl = valueEl.parentNode.children[1]
          if (nextEl) toggleEl(nextEl)
        })

        // select on click
        valueEl.addEventListener('click', () => {
          if (onSelect) onSelect(child)
        })

        containerEl.append(childEl)
        buildTreeView(child, childEl, deep + 1)
      })

      parentEl.append(containerEl)
    }

    return parentEl
  }

  const containerEl = newEl('div')
  const treeView = buildTreeView(root, null, 0)
  containerEl.append(treeView)
  return containerEl
}

export default function createHierarchy (gameObject, inspector) {
  const hierarchy = windowEl('hierarchy')
  setElValue(hierarchy.windowTab.title, 'Hierarchy')

  const tree = treeView({
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