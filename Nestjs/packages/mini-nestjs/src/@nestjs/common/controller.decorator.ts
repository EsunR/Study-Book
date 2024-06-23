import "reflect-metadata";

interface ControllerOptions {
    prefix?: string;
}

export function Controller(): ClassDecorator;
export function Controller(prefix: string): ClassDecorator;
export function Controller(options: ControllerOptions): ClassDecorator;
export function Controller(
    prefixOrOptions?: string | ControllerOptions
): ClassDecorator {
    let options: ControllerOptions = {};
    if (typeof prefixOrOptions === "string") {
        options.prefix = prefixOrOptions;
    }
    if (typeof prefixOrOptions === "object") {
        options = prefixOrOptions;
    }
    return (target: Function) => {
        Reflect.defineMetadata("prefix", options.prefix || "", target);
    };
}
