import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import config from './config/configuration'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'
import { mongoose } from '@typegoose/typegoose'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class AppModule {
    constructor(private readonly configService: ConfigService) {
        this.connectMongoDB()
    }

    private async connectMongoDB() {
        await mongoose
            .connect(this.configService.get<string>('database.uri'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .catch(e => console.error(e))
        console.log('Connected to database')
    }
}
