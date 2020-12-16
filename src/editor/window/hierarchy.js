import { windowEl } from '../controls'

export default function createHierarchy (gameObject) {
  const hierarchy = windowEl({ title: 'Hierarchy' })
  document.body.append(hierarchy.box)
}