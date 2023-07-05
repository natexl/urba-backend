import * as bcrypt from 'bcrypt';
import { EggLogger } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, Context } from '@eggjs/tegg';
import { EggContext } from '@eggjs/tegg';
import { UserService } from '../service/UserService';

@HTTPController({
    path: '/user',
  })
export class UserController{
  @Inject()
  logger: EggLogger;

  @Inject()
  userService: UserService

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'register',
  })
  async register(@Context() ctx: EggContext) {
    const { username, password } = ctx.request.body;
    
    // 对密码进行 hash 加密
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.register(username, hashedPassword)

    // TODO: 将用户数据保存到数据库
    // 在此之前，您需要根据数据库类型（如 MySQL, PostgreSQL 等）编写适当的数据访问/存储方法
    // 示例： await app.model.user.create({ username, password: hashedPassword });

    ctx.body = {
      success: true,
      message: 'User registered successfully.'
    };
  }
}