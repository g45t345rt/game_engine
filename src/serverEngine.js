import Engine from './engine'
import WebSocket from 'isomorphic-ws'

export default class ServerEngine extends Engine {
  constructor (game, port, options = {}) {
    super(game, options)
    this.port = port
  }

  start () {
    if (this.port && !this.wss) {
      this.wss = new WebSocket.Server({ port: this.port })

      this.game.serverSocket = this.wss
      this.wss.on('connection', (ws) => {
        this.game.socket = ws

        this.wss.broadcastAll = (msg) => {
          this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(msg)
            }
          })
        }

        this.wss.broadcastOthers = (msg) => {
          this.wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(msg)
            }
          })
        }

        ws.on('message', (message) => this.game.dispatch('dataFromClient', message))
        super.start()
      })
    }
  }
}
