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
        const originId = data.originId
        delete data.originId
        // save this message to databse
        const msg = await Message.create(data)
        // if rcv is connected, send it
        this.server.clients.forEach(client => {
            if ((client as any).id === data.rcvId) {
                client.send(
                    JSON.stringify({
                        event: 'message',
                        data: {
                            id: msg.id,
                            type: 'rcv',
                            content: data.msg,
                        },
                    }),
                )
            }
        })
        // send real id back
        return {
            event: 'confirm',
            data: {
                originId,
                realId: msg._id,
            },
        }
    }
}
