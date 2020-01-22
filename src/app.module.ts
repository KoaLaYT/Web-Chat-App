import { Module } from '@nestjs/common'
import { CONFIG } from './config/configuration'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'
import { mongoose } from '@typegoose/typegoose'
import { ChatGateway } from './chats/chat.gateway'
import { MessageController } from './chats/message.controller'
import { MessageService } from './chats/message.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client/dist'),
        }),
    ],
    controllers: [UserController, MessageController],
    providers: [UserService, ChatGateway, MessageService],
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
                useFindAndModify: false,
            })
            .catch(e => console.error(e))
        console.log('Connected to database')
    }
}
