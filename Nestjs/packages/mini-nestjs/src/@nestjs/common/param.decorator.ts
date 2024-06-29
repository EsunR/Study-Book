import "reflect-metadata";

export const createParamDecorator = (keyOrFunction: string | Function) => {
    return (data?: any) =>
        /**
         * @param target 控制器原型
         * @param propertyKey 方法名
         * @param parameterIndex 参数索引（先走1再走0）
         */
        (target: any, propertyKey: string, parameterIndex: number) => {
            // 给控制器类的原型的 propertyKey 也就是 handleRequest 方法属性上添加元数据
            // 属性名是 params: handleRequest，值是一个数组
            const existingParameters =
                Reflect.getMetadata("params", target, propertyKey) || [];
            // 自定义装饰器
            if (keyOrFunction instanceof Function) {
                existingParameters[parameterIndex] = {
                    parameterIndex,
                    key: "DecoratorFactory",
                    factory: keyOrFunction,
                    data,
                };
            }
            // 内置装饰器
            else {
                existingParameters[parameterIndex] = {
                    parameterIndex,
                    key: keyOrFunction,
                    data,
                };
            }
            Reflect.defineMetadata(
                "params",
                existingParameters,
                target,
                propertyKey
            );
        };
};

export const Request = createParamDecorator("Request");
export const Req = createParamDecorator("Req");
export const Query = createParamDecorator("Query");
export const Headers = createParamDecorator("Headers");
export const Session = createParamDecorator("Session");
export const Ip = createParamDecorator("Ip");
export const Param = createParamDecorator("Param");
export const Body = createParamDecorator("Body");

export const Response = createParamDecorator("Response");
export const Res = createParamDecorator("Res");

export const Next = createParamDecorator("Next");
