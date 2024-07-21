import "reflect-metadata";

interface ModuleMetadata {
    controllers?: Function[];
    providers?: any[];
}

// 定义模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target: Function) => {
        // 给模块类添加元数据
        Reflect.defineMetadata("controllers", metadata.controllers, target);
        Reflect.defineMetadata("providers", metadata.providers, target);
    };
}
