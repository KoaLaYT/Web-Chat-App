import { Module } from '@nestjs/common'
import { CONFIG } from './config/configuration'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'
import { mongoose } from '@typegoose/typegoose'
import { ChatGateway } from './chats/chat.gateway'

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, ChatGateway],
})
export class AppModule {
    constructor() {
        this.connectMongoDB()
    }

    private async connectMongoDB() {
        await mongoose
            .connect(CONFIG.database.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .catch(e => console.error(e))
        console.log('Connected to database')
    }
}
