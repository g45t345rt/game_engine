import 'normalize.css'

import render from 'engine/render'
import GameObject from 'engine/gameObject'
import Camera from 'engine/components/camera'
import Transform from 'engine/components/transform'
import Rect from 'engine/components/rect'
import Grid from 'engine/components/grid'
import DrawFPS from 'engine/components/drawFps'
import Editor from 'engine/editor'

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

const editor = new Editor(game)
render(game, (args) => editor.update(args))

