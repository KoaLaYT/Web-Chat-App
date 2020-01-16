import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CONFIG } from './config/configuration'
import { WsAdapter } from '@nestjs/platform-ws'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    })
    // ws websocket
    app.useWebSocketAdapter(new WsAdapter(app))
    await app.listen(CONFIG.port)
}
bootstrap()
