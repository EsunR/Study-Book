import "reflect-metadata";

interface ModuleMetadata {
    controllers?: Function[];
    providers?: any[];
    /** 模块的导出，把自己的一部分 providers 导出给别的模块 */
    exports?: any[];
    /** 导入的模块，可以导入别的模块，把别的模块导出的 providers 给当前模块用 */
    imports?: any[];
}

// 定义模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target: Function) => {
        // 给模块类添加元数据
        Reflect.defineMetadata("controllers", metadata.controllers, target);
        Reflect.defineMetadata("providers", metadata.providers, target);
        Reflect.defineMetadata("exports", metadata.exports, target);
        Reflect.defineMetadata("imports", metadata.imports, target);
    };
}
