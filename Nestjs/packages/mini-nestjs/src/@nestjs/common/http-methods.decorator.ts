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

export function Post(path: string = ""): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        // descriptor.value 就是所装饰的方法
        Reflect.defineMetadata("path", path, descriptor.value);
        Reflect.defineMetadata("method", "POST", descriptor.value);
    };
}

export function Redirect(
    url: string = "",
    statusCode: number = 302
): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        Reflect.defineMetadata("redirectUrl", url, descriptor.value);
        Reflect.defineMetadata(
            "redirectStatusCode",
            statusCode,
            descriptor.value
        );
    };
}

export function HttpCode(statusCode: number = 200) {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        Reflect.defineMetadata("statusCode", statusCode, descriptor.value);
    };
}

export function Header(name: string, value: string) {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const existingHeaders =
            Reflect.getMetadata("headers", descriptor.value) || [];
        existingHeaders.push({ name, value });
        Reflect.defineMetadata("headers", existingHeaders, descriptor.value);
    };
}
