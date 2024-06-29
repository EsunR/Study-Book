import { createParamDecorator } from "@nestjs/common";

// 假设有一个中间件，将用户信息挂载到 req.user 上，我们可以通过 User 装饰器获取用户信息
export const User = createParamDecorator((data: any, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.user[data] : req.user;
});
