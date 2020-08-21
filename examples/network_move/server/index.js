import { ServerEngine } from 'game_engine'
import Game from '../game'

const game = new Game()
const gameEngine = new ServerEngine(game, 8080)
gameEngine.start()
