//const GameObject = require('../src/gameObject')
import { GameObject } from '../src'

test('performance', () => {

  const gameObject = new GameObject({ tag: 'game' })

  let i = 0
  while (i < 1000) {
    gameObject.addGameObject(new GameObject({ tag: i }))
    i++
  }

  console.time('test')
  gameObject.dispatch('render')
  console.timeEnd('test')
})
