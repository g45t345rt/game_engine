import 'normalize.css'

import { GameObject, components, Renderer, Updater, useDebugTools } from 'gemer'
import Box from './box'

const { Transform, Rect } = components

const box = new GameObject()
box.addComponent(Transform)
box.addComponent(Rect, { w: 50, h: 50 })
box.addComponent(Box)

const updater = new Updater({ root: box })
const renderer = new Renderer({ root: box })

const dev = true // mocking
if (dev) useDebugTools(renderer)

document.body.append(renderer.canvas)

updater.start()
renderer.start()