import * as jwt from 'jsonwebtoken';
import { EggLogger } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, Context } from '@eggjs/tegg';
import { EggContext } from '@eggjs/tegg';
import { UserService } from '../service/UserService';

@HTTPController({
    path: '/auth',
  })
export class AuthController{
  @Inject()
  logger: EggLogger;

  @Inject()
  userService: UserService;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'login',
  })
  async login(@Context() ctx: EggContext) {
    const {app} = ctx
    const { username, password } = ctx.request.body;
    
    // TODO: 验证用户名和密码是否正确
    // 在此之前，你需要编写一个用于验证用户名和密码的函数
    let authRes = await this.userService.login(username, password)
    if (/*用户名和密码匹配*/authRes) {
      const token = jwt.sign({ username }, app.config.jwt.secret, { expiresIn: '48h' });
      const refreshToken = jwt.sign({ username }, app.config.jwt.refreshSecret, { expiresIn: '30d' });

      ctx.body = {
        success: true,
        token,
        refreshToken
      };
    } else {
      ctx.body = {
        success: false,
        message: 'Incorrect username or password.'
      };
    }
  }

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'refresh',
  })
  async refreshToken(@Context() ctx: EggContext) {
    const { app } = ctx;
    const { refreshToken } = ctx.request.body;

    try {
      const decoded = jwt.verify(refreshToken, app.config.jwt.refreshSecret) as { username: string };
      const { username } = decoded;
      const newToken = jwt.sign({ username }, app.config.jwt.secret, { expiresIn: '48h' });

      ctx.body = {
        success: true,
        token: newToken
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: 'Invalid refresh token.'
      };
    }
  }
}
