import WebSocket from 'ws'

import { engine } from 'game_engine'
import Game from '../game'

const wss = new WebSocket.Server({ port: 8080 })
const game = new Game()
engine({ game, wss })
