import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CONFIG } from './config/configuration'
import { WsAdapter } from '@nestjs/platform-ws'
import { setGlobalOptions } from '@typegoose/typegoose'
import * as express from 'express'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // typegoose global settings
    setGlobalOptions({ schemaOptions: { timestamps: true, versionKey: false } })
    // ws websocket
    app.useWebSocketAdapter(new WsAdapter(app))
    await app.listen(CONFIG.port)
}
bootstrap()
