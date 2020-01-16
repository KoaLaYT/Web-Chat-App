import { UserService } from './user.service'
import { Controller, Post, Body } from '@nestjs/common'

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/')
    postAUser(@Body('name') name: string) {
        return this.userService.postAUser(name)
    }
}
