import { Message } from './message.entity'
import { Injectable } from '@nestjs/common'
import * as mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

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

    // get chat overview list of user
    async getOverview(userId: string) {
        return await Message.aggregate()
            .match({
                $or: [{ sndId: ObjectId(userId) }, { rcvId: ObjectId(userId) }],
            })
            .project({
                _id: 0,
                title: {
                    $cond: {
                        if: { $eq: ['$sndId', ObjectId(userId)] },
                        then: '$rcvName',
                        else: '$sndName',
                    },
                },
                time: '$createdAt',
                message: '$msg',
            })
            .sort('time')
            .group({ _id: '$title', overview: { $mergeObjects: '$$ROOT' } })
            .replaceRoot('overview')
    }
}
