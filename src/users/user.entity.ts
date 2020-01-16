/*
 * @Author: KoaLaYT
 * @Date: 2020-01-16 22:28:56
 * @Last Modified by: KoaLaYT
 * @Desc: Users
 * @Last Modified time: 2020-01-16 22:30:15
 */

import { prop, getModelForClass } from '@typegoose/typegoose'

export class UserModel {
    @prop({ required: true })
    name!: string
}

export const User = getModelForClass(UserModel)
