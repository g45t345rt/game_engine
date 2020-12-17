import createInspector from './tools/inspector'
import createHierarchy from './tools/hierarchy'

export function useDebugTools (renderer) {
  const { root } = renderer
  createInspector(root)
  createHierarchy(root)

  renderer.addEventListener('render', (args) => {

  })
}