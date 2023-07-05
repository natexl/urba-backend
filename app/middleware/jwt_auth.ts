import { Context } from 'egg';
import * as jwt from 'jsonwebtoken';
import type { Next } from '@eggjs/tegg';
import jwtConfig from "../config/jwt"

// export function jwtAuth(options: { secret: string }, app) {
//     return async (ctx: Context, next: () => Promise<any>) => {
//         const token = ctx.request.header.authorization;

//         if (!token) {
//             ctx.status = 401;
//             ctx.body = {
//                 success: false,
//                 message: 'Authorization token is missing.'
//             };
//             return;
//         }

//         try {
//             const decoded = jwt.verify(token, options.secret);
//             (ctx.state as any).user = decoded; // 将解码的用户信息保存在 ctx.state.user 中，以便在控制器中访问
//             await next();
//         } catch (error) {
//             ctx.status = 401;
//             ctx.body = {
//                 success: false,
//                 message: 'Invalid or expired authorization token.'
//             };
//             return;
//         }
//     };
// }

export async function jwtAuth(ctx: Context, next: Next) {
    const token = ctx.request.header.authorization;

    if (!token) {
        ctx.status = 401;
        ctx.body = {
            success: false,
            message: 'Authorization token is missing.'
        };
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        (ctx.state as any).user = decoded; // 将解码的用户信息保存在 ctx.state.user 中，以便在控制器中访问
        await next();
    } catch (error) {
        ctx.status = 401;
        ctx.body = {
            success: false,
            message: 'Invalid or expired authorization token.'
        };
        return;
    }

    return next()
}