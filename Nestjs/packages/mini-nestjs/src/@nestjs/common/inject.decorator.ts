import "reflect-metadata";
import { INJECTED_TOKENS } from "./constance";

export function Inject(token: string): ParameterDecorator {
    // target: 类的本身 propertyKey: 方法名 parameterIndex: 参数索引
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        const existingInjectedTokens: any[] =
            Reflect.getMetadata(INJECTED_TOKENS, target) ?? [];
        existingInjectedTokens[parameterIndex] = token;
        // 把数组保存在 target 的元数据上
        Reflect.defineMetadata(
            INJECTED_TOKENS,
            existingInjectedTokens,
            target
        );
    };
}
