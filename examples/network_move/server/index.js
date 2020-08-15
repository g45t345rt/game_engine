import { Engine } from 'game_engine'
import Game from '../game'

const game = new Game()
const gameEngine = new Engine(game)
gameEngine.start()
