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

    // 初始化工作
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
                const httpMethod = Reflect.getMetadata("method", method);
                // 如果没有配置路由装饰器，则跳过
                if (!httpMethod) continue;
                const pathMetadata = Reflect.getMetadata("path", method);
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
                        const responseMetaData = this.getResponseMetaData(
                            controller,
                            methodName
                        );
                        // 如果使用了 @Response 装饰器，则不自动发送响应
                        if (
                            !responseMetaData ||
                            responseMetaData?.data?.passthrough
                        ) {
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
        return paramsMetaData.map((paramMetaData) => {
            const { key, data } = paramMetaData;
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
                default:
                    null;
            }
        });
    }

    private getResponseMetaData(instance: any, methodName: string) {
        const paramsMetaData =
            Reflect.getMetadata("params", instance, methodName) ?? [];
        return paramsMetaData.find(
            (paramMetaData) =>
                paramMetaData.key === "Response" || paramMetaData.key === "Res"
        );
    }

    // 启动服务
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
