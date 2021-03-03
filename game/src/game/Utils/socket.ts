import { EmitResponseInterface, EmitRequestInterface } from '@/game/types'
import { Socket, io } from "socket.io-client"
import Player from '@/game/Models/Player'
export default class Client {
  private id!: string
  private client!: Socket;

  public connect(callback: () => void) {
    let url = 'ws://46.17.40.175:3000'

    if (process.env.NODE_ENV === 'development') {
      url = 'ws://localhost:3000'
    }

    this.client = io(url, {
      reconnectionDelayMax: 1000,
    })

    this.client.on("connect", () => {
      this.id = this.client.id
      callback()
    })
  }

  public init(player: Player) {
    const request = player.request
    request.id = this.id
    this.client.emit('init', request)
  }

  public onInit(callback: (data: EmitResponseInterface) => void) {
    this.client.on("init", (data: EmitResponseInterface) => {
      callback(data)
    })
  }

  public emit(player: Player) {
    const request = player.request
    request.id = this.id
    this.client.emit('emit', request)
  }

  public onEmit(callback: (data: EmitResponseInterface) => void) {
    this.client.on("emit", (data: EmitResponseInterface) => {
      callback(data)
    })
  }

  public onDisconect(callback: (id: string) => void) {
     this.client.on("disconectitem", (id: string) => {
      callback(id)
    })
  }
}
