import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets'
import { Server } from 'ws'

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('login')
    handleMessage(@MessageBody() data, @ConnectedSocket() client: WebSocket) {
        console.log(data)
        console.log(this.server.clients.size)
        console.log(this.server.clients.forEach(c => (c as any).id))
    }
}
