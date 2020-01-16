import { User } from './user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
    // return this user's id or create a new user
    async postAUser(name: string): Promise<string> {
        let user = await User.findOne({ name })
        if (!user) {
            user = await User.create({ name })
        }
        return user._id
    }
}
