/*
 * @Author: KoaLaYT
 * @Date: 2020-01-16 22:28:56
 * @Last Modified by: KoaLaYT
 * @Desc: Users
 * @Last Modified time: 2020-01-17 00:12:35
 */

import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class UserModel {
    @prop({ required: true })
    name!: string
}

export const User = getModelForClass(UserModel)
