import { Message } from './message.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MessageService {
    // get chat history of user1 and user2
    async getChat({
        u1,
        u2,
        pageSize,
        pageNum,
    }: {
        u1: string
        u2: string
        pageNum: number
        pageSize: number
    }) {
        return await Message.find({
            $or: [{ sndId: u1, rcvId: u2 }, { sndId: u2, rcvId: u1 }],
        })
            .sort('createdAt')
            .skip(pageSize * pageNum)
            .limit(pageSize)
    }
}
