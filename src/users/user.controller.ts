import { UserService } from './user.service'
import { Controller, Post, Body, Headers, Get, Query } from '@nestjs/common'

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/')
    postAUser(@Body('name') name: string) {
        return this.userService.postAUser(name)
    }

    @Get('/')
    getUsers(@Query('self') self: string) {
        return this.userService.getUsers(self)
    }
}
