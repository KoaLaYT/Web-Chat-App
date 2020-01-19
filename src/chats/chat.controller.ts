import { ChatService } from './chat.service'
import { Controller, Get, Query, Param } from '@nestjs/common'

@Controller('/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('/:userId')
    getChat(
        @Param('userId') userId: string,
        @Query('with') withId: string,
        @Query('pageSize') pageSize: string,
        @Query('pageNum') pageNum: string,
    ) {
        return this.chatService.getChat({
            u1: userId,
            u2: withId,
            pageSize: Number(pageSize),
            pageNum: Number(pageNum),
        })
    }
}
