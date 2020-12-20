import createInspector from './tools/inspector'
import createHierarchy from './tools/hierarchy'
import createMenu from './tools/menu'

export function useDebugTools (renderer) {
  const { root } = renderer
  const inspector = createInspector(root)
  const hierarchy = createHierarchy(root, inspector)

  createMenu({ inspector, hierarchy })

  renderer.addEventListener('render', (args) => {

  })
}