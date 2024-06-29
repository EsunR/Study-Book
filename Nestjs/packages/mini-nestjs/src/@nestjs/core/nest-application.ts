import "reflect-metadata";
import express, {
    Express,
    NextFunction as ExpressNextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import path from "path";
import { Logger } from "./logger";

export class NestApplication {
    // 在内部私有化一个 Express 实例
    private readonly app: Express = express();

    constructor(protected readonly module) {
        this.app.use(express.json()); // 解析 application/json
        this.app.use(express.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded
    }

    /**
     * 初始化工作
     */
    async init() {
        const controllers =
            Reflect.getMetadata("controllers", this.module) || [];
        Logger.log(`AppModule dependencies initialized`, "InstanceLoader");
        for (const Controller of controllers) {
            const controller = new Controller();
            // 获取控制器的路径前缀
            const prefix = Reflect.getMetadata("prefix", Controller) || "/";
            Logger.log(`${Controller.name} {${prefix}}`, "RoutesResolver");
            const controllerPrototype = Controller.prototype;
            // 遍历类的原型上的方法名(包含 constructor (constructor 指向类本身))
            for (const methodName of Object.getOwnPropertyNames(
                controllerPrototype
            )) {
                // 获取原型上的方法
                const method = controllerPrototype[methodName];

                // 获取方法上的元数据
                const httpMethod = Reflect.getMetadata("method", method);
                if (!httpMethod) continue;
                const pathMetadata = Reflect.getMetadata("path", method);
                const redirectUrl = Reflect.getMetadata("redirectUrl", method);
                const redirectStatusCode = Reflect.getMetadata(
                    "redirectStatusCode",
                    method
                );
                const statusCode = Reflect.getMetadata("statusCode", method);
                const headers = Reflect.getMetadata("headers", method) || [];

                // 拼接路由，执行路由的时候会执行对应的方法
                const routePath = path.posix.join("/", prefix, pathMetadata);
                this.app[httpMethod.toLowerCase()](
                    routePath,
                    // 配置路由，当客户端以 httpsMethod 方法请求 routePath 的时候，会由对应的函数进行处理
                    (
                        req: ExpressRequest,
                        res: ExpressResponse,
                        next: ExpressNextFunction
                    ) => {
                        const args = this.resolveParams(
                            controller,
                            methodName,
                            req,
                            res,
                            next
                        );
                        const result = method.call(controller, ...args);

                        // 如果需要重定向，直接定向到指定的 url
                        if (result?.url) {
                            return res.redirect(
                                result?.statusCode ?? 302,
                                result.url
                            );
                        }
                        if (redirectUrl) {
                            return res.redirect(
                                redirectStatusCode,
                                redirectUrl
                            );
                        }

                        // 是否指定了状态码
                        if (statusCode) {
                            res.statusCode = statusCode;
                        } else if (httpMethod === "POST") {
                            // POST 请求默认状态码是 201
                            res.statusCode = 201;
                        }

                        // 判断是否使用了 @Response、@next 装饰器
                        const responseMetaData = this.getResponseMetaData(
                            controller,
                            methodName
                        );
                        // 如果使用了 @Response 装饰器，则不自动发送响应
                        // 但是如果开启了 pathsthrough，则还是会自动发送响应
                        if (
                            !responseMetaData ||
                            responseMetaData?.data?.passthrough
                        ) {
                            headers.forEach(({ name, value }) => {
                                res.setHeader(name, value);
                            });
                            res.send(result);
                        }
                    }
                );
                Logger.log(
                    `Mapped {${routePath}, ${httpMethod}} route`,
                    "RouteResolver"
                );
            }
        }
        Logger.log("Nest application successfully started", "NestApplication");
    }

    private resolveParams(
        instance: any,
        methodName: string,
        req: ExpressRequest,
        res: ExpressResponse,
        next: ExpressNextFunction
    ) {
        // 获取参数的元数据
        const paramsMetaData =
            Reflect.getMetadata("params", instance, methodName) || [];
        // 构建上下文
        const ctx = {
            switchToHttp: () => ({
                getRequest: () => req,
                getResponse: () => res,
                getNext: () => next,
            }),
        };
        return paramsMetaData.map((paramMetaData) => {
            const { key, data, factory } = paramMetaData;
            switch (key) {
                case "Request":
                case "Req":
                    return req;
                case "Query":
                    return data ? req.query[data] : req.query;
                case "Headers":
                    return data ? req.headers[data] : req.headers;
                case "Session":
                    return data ? req.session[data] : req.session;
                case "Ip":
                    return req.ip;
                case "Param":
                    return data ? req.params[data] : req.params;
                case "Body":
                    return data ? req.body[data] : req.body;

                case "Response":
                case "Res":
                    return res;

                case "Next":
                    return next;

                case "DecoratorFactory":
                    return factory(data, ctx);
                default:
                    null;
            }
        });
    }

    /**
     * 判断是否使用了 @Response 装饰器
     */
    private getResponseMetaData(instance: any, methodName: string) {
        const paramsMetaData =
            Reflect.getMetadata("params", instance, methodName) ?? [];
        return paramsMetaData.find((paramMetaData) => {
            return (
                paramMetaData?.key === "Response" ||
                paramMetaData?.key === "Res" ||
                paramMetaData?.key === "Next"
            );
        });
    }

    /**
     * 启动服务
     */
    async listen(port: number) {
        await this.init();
        this.app.listen(port, () => {
            Logger.log(
                `Server is running on http://localhost:${port}`,
                "NestApplication"
            );
        });
    }

    use(middleware) {
        this.app.use(middleware);
    }
}
