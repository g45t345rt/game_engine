import { Updater, GameObject } from 'gemer'
import { Renderer } from '../../src'
import { newEl, setElValue } from '../../src/ui'

const root = new GameObject()
const updater = new Updater({ root })
const renderer = new Renderer({ root })

const newElButton = (text, onClick) => {
  const button = newEl('input')
  setElValue(button, text)
  button.type = 'button'
  button.addEventListener('click', onClick)
  return button
}

const play = newElButton('Play', () => updater.start())
const stop = newElButton('Stop', () => updater.stop())
const stepFoward = newElButton('Step foward', () => updater.stepForward())
const stepBackward = newElButton('Step back', () => updater.stepBackward())

document.body.append(play, stop, stepFoward, stepBackward)
document.body.append(renderer.canvas)

renderer.start()
updater.start()