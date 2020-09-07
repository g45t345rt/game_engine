import { ServerEngine } from 'game_engine'
import Game from '../game'

const gameEngine = new ServerEngine(Game, 8080, { updatePerSeconds: 1 })
gameEngine.start()
