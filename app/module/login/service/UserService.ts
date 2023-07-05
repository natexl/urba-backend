import * as bcrypt from 'bcrypt';
import { getUserByName, updateUser, createUser } from "@/model/user"
import { EggLogger } from 'egg';
import { SingletonProto, AccessLevel, Inject } from '@eggjs/tegg';

@SingletonProto({
    // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
    accessLevel: AccessLevel.PUBLIC,
})
export class UserService {
    // 注入一个 logger
    @Inject()
    logger: EggLogger;

    async login(username: string, password: string) {
        let user = await getUserByName(username)
        if (user) {
            let compareRes = await bcrypt.compare(password, user.password)
            if (compareRes) {
                let date = new Date(Date.now())
                user.last_time = date.toISOString()
                await updateUser(user)
                return user
            }
        }
        return false
    }

    async register(username: string, password: string) {
        let user = await getUserByName(username)
        if(user) return false
        try {
            await createUser(username, password)
            return true
        } catch {
            return false
        }
    }
}