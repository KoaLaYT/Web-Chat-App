import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'ws'

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        console.log(this.server.clients)
        console.log(typeof client, typeof payload)
        return 'Hello world!'
    }
}
