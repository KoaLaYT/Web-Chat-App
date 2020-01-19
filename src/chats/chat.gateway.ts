import { Message } from './message.entity'
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
    handleLogin(@MessageBody() data, @ConnectedSocket() client) {
        client.id = data.id
    }

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() data) {
        console.log(data)
        // save this message to databse
        // const msg = await Message.create(data)
    }
}
