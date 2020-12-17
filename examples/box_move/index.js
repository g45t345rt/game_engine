import 'normalize.css'

import { GameObject, render, components, Editor } from 'gemer'
import Box from './box'

const { Transform, Rect } = components

const box = new GameObject()
box.addComponent(Transform)
box.addComponent(Rect, { w: 50, h: 50 })
box.addComponent(Box)

new Editor(box)
render(box)
