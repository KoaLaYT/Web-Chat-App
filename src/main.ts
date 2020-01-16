import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CONFIG } from './config/configuration'
import { WsAdapter } from '@nestjs/platform-ws'
import './plugins/element.js'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // ws websocket
    app.useWebSocketAdapter(new WsAdapter(app))
    await app.listen(CONFIG.port)
}
bootstrap()
