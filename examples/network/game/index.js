import { GameObject, components } from 'gemer'

const { Transform, Rect, Camera, Grid } = components

const world = new GameObject({ autoDraw: false })
world.addComponent(Transform)
world.addComponent(Rect, { w: 500, h: 500 })
world.addComponent(Grid, { sw: 10, sh: 10 })

const camera = new GameObject()
camera.addComponent(Transform)
camera.addComponent(Rect, { w: 500, h: 500 })
camera.addComponent(Camera, { render: world })

const game = new GameObject()
game.addChild(camera, 'camera')
game.addChild(world, 'world')

export default game