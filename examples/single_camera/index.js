import 'normalize.css'

import { GameObject, Renderer, components, useDebugTools } from 'gemer'
import { Updater } from '../../src'

//import { Transform, Rect, Grid, Camera, DrawFPS } from 'gemer/components'
const { Transform, Rect, Grid, Camera, DrawFPS } = components

const world = new GameObject({ autoDraw: false })
world.addComponent(Transform)
world.addComponent(Rect, { w: 500, h: 500 })
world.addComponent(Grid, { sw: 10, sh: 10 })

const mainCamera = new GameObject()
/*
mainCamera.addComponents([
  Transform, null,
  Rect, { w: 500, h: 500 },
  Camera, { render: world }
])*/

mainCamera.addComponent(Transform)
mainCamera.addComponent(Rect, { w: 500, h: 300 })
mainCamera.addComponent(Camera, { render: world })

const box = new GameObject()
box.addComponent(Transform)
box.addComponent(Rect, { w: 50, h: 50 })

box.draw = function ({ ctx }) {
  const { w, h } = this.getComponent(Rect)
  ctx.fillStyle = 'yellow'
  ctx.fillRect(0, 0, w, h)
}

world.addChild(box)

const fps = new GameObject()
fps.addComponent(Transform)
fps.addComponent(DrawFPS)

const game = new GameObject()
game.addChild(mainCamera, 'mainCamera')
game.addChild(fps, 'fps')
game.addChild(world, 'world')

const updater = new Updater({ root: game })
const renderer = new Renderer({ root: game })

const dev = false // mocking
if (dev) useDebugTools(renderer)

document.body.append(renderer.canvas)

renderer.start()
updater.start()

