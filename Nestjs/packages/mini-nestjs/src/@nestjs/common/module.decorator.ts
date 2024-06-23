import "reflect-metadata";

interface ModuleMetadata {
    controllers: Function[];
}

// 定义模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target: Function) => {
        // 给模块类添加装饰器
        Reflect.defineMetadata("controllers", metadata.controllers, target);
    };
}
