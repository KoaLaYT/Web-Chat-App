import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
} from '@nestjs/websockets'
import { Server } from 'ws'

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('login')
    handleMessage(@MessageBody() data) {
        console.log(data)
        console.log(this.server.clients.size)
        setTimeout(() => console.log(this.server.clients.size), 30000)
    }
}
