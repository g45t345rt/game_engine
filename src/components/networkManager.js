import { GameComponent } from '../gameComponent'

export default class NetworkManager extends GameComponent {
  constructor ({ netId, clientUrl, serverPort }) {
    super('network_manager')

    this.netId = netId
    this.clientUrl = clientUrl
    this.serverPort = serverPort

    this.clientNetwork = null
  }

  onClientAwake = () => {
    const webSocket = new WebSocket(this.url)
    webSocket.onmessage = (e) => this.gameObject.__dispatch('onNetClient', { e, netId })
    webSocket.onopen = (e) => this.gameObject.__dispatch('onNetClient', { e, netId })
    webSocket.onclose = (e) => this.gameObject.__dispatch('onNetClient', { e, netId })
    webSocket.onerror = (e) => this.gameObject.__dispatch('onNetClient', { e, netId })
    this.clientNetwork = webSocket
  }

  onServerAwake = () => {
    import WebSocket from 'ws'
    const wss = new WebSocket.Server({ port: 8080 })
    
  }
}
