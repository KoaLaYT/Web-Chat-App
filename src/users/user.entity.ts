import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class UserModel {
    @prop({ required: true })
    name!: string
}
