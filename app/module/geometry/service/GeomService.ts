import { getGeomByBounds } from "@/model/geom"
import { EggLogger } from 'egg';
import { SingletonProto, AccessLevel, Inject } from '@eggjs/tegg';

@SingletonProto({
    // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
    accessLevel: AccessLevel.PUBLIC,
})

export class GeomService {
    // 注入一个 logger
    @Inject()
    logger: EggLogger;

    async getBuildGeometryByBounds(bounds: number[]) {
        let res = await getGeomByBounds(bounds)
        if (res) {
            return res
        }
        return res
    }
}