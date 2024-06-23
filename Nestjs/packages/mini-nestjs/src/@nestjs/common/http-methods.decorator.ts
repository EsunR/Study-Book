import "reflect-metadata";

export function Get(path: string = ""): MethodDecorator {
    return (
        /** 类的原型 */
        target: any,
        /** 方法名 */
        propertyKey: string | symbol,
        /** 属性描述器 */
        descriptor: PropertyDescriptor
    ) => {
        // descriptor.value 就是所装饰的方法
        Reflect.defineMetadata("path", path, descriptor.value);
        Reflect.defineMetadata("method", "GET", descriptor.value);
    };
}
