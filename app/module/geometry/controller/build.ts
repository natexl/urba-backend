import { EggLogger } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, Context } from '@eggjs/tegg';
import { EggContext } from '@eggjs/tegg';
import { GeomService } from '../service/GeomService';

@HTTPController({
    path: '/geom',
  })
export class GeomController{
  @Inject()
  logger: EggLogger;

  @Inject()
  geomService: GeomService;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'getbuild',
  })
  async getBuild(@Context() ctx: EggContext) {
    const { bounds } = ctx.request.body;
    
    // TODO: 验证用户名和密码是否正确
    let searchRes = await this.geomService.getBuildGeometryByBounds(bounds)
    if (searchRes) {
      ctx.body = {
        success: true,
        data: searchRes,
      };
    } else {
      ctx.body = {
        success: false,
        message: 'Incorrect username or password.'
      };
    }
  }
}
