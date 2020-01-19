import { MessageService } from './message.service'
import { Controller, Get, Query, Param } from '@nestjs/common'

@Controller('/message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get('/:userId')
    getChat(
        @Param('userId') userId: string,
        @Query('with') withId: string,
        @Query('pageSize') pageSize: string,
        @Query('pageNum') pageNum: string,
    ) {
        return this.messageService.getChat({
            u1: userId,
            u2: withId,
            pageSize: Number(pageSize),
            pageNum: Number(pageNum),
        })
    }
}
