import { User } from './user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
    // return this user's id or create a new user
    async postAUser(name: string): Promise<string> {
        const user = await User.findOneAndUpdate(
            { name },
            {},
            { upsert: true, new: true, setDefaultsOnInsert: true },
        )
        return user._id
    }
}
