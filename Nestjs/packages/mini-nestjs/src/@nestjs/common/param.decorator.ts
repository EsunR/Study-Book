import "reflect-metadata";

export const createParamDecorator = (key: string) => {
    return () =>
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
            existingParameters.push({ parameterIndex, key });
            Reflect.defineMetadata(
                "params",
                existingParameters,
                target,
                propertyKey
            );
        };
};

export const Request = createParamDecorator("Request");

export const Req = Request;
