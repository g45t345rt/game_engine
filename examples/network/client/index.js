import 'normalize.css'

import { Renderer, GameObject, components } from 'gemer'
import game from '../game'
import { newEl, setElValue } from '../../../src/ui'

const { Transform, Rect } = components

const button = newEl('input')
button.type = 'button'
setElValue(button, 'Connect')
button.addEventListener('click', () => {
  const ws = new WebSocket('ws://localhost:8080')

  ws.addEventListener('open', () => {
    console.log('open')

    game.childs.world.addChild(player)
  })
  
  
  ws.addEventListener('message', (msg) => {
    console.log(msg)
  })

})

document.body.append(button)

const renderer = new Renderer()
renderer.render(game)

