import 'normalize.css'

import { GameObject, components, Renderer, useDebugTools } from 'gemer'
import Box from './box'

const { Transform, Rect } = components

const box = new GameObject()
box.addComponent(Transform)
box.addComponent(Rect, { w: 50, h: 50 })
box.addComponent(Box)

const renderer = new Renderer()
renderer.render(box)

const dev = true // mocking
if (dev) useDebugTools(renderer)
