/*
 * @Author: KoaLaYT
 * @Date: 2020-01-19 22:27:12
 * @Last Modified by: KoaLaYT
 * @Desc: 聊天记录
 * @Last Modified time: 2020-01-19 23:01:38
 */

import { UserModel } from '../users/user.entity'
import { modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class MessageModel {
    // 发送人ID
    @prop({ required: true, ref: 'UserModel' })
    sndId!: Ref<UserModel>
    // 发送人昵称
    @prop({ required: true })
    sndName!: string

    // 接受人ID
    @prop({ required: true, ref: 'UserModel' })
    rcvId!: Ref<UserModel>
    // 接受人昵称
    @prop({ required: true })
    rcvName!: string

    // 信息
    @prop({ required: true })
    msg!: string
}

export const Message = getModelForClass(MessageModel)
