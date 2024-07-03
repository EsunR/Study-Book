type ClassMethodDecorator = (
    value: Function,
    /** 装饰值的类型 */
    context: {
        kind: "method" | "class" | "getter" | "setter" | "field" | "accessor";
    },
    /** 表示被装饰的值的名称 */
    name: string,
    /** 表示被装饰的值是否是静态的 */
    // @ts-ignore
    static: boolean,
    /** 表示被装饰的值是否是私有的 */
    // @ts-ignore
    private: boolean
) => Function | void;

function logged(value, context) {
    console.log("🚀 ~ logged ~ value:", value);
    console.log("🚀 ~ logged ~ context:", context);
    const { kind, name } = context;
    if (kind === "method") {
        return function (...args) {
            console.log(`Calling ${name} with`, args);
            const result = value.call(this, ...args);
            console.log(`ending ${name}`);
            return result;
        };
    }
}

class Cat {
    @logged
    private static sum(a, b) {
        return a + b;
    }

    public getSum(a, b) {
        return Cat.sum(a, b);
    }
}

new Cat().getSum(1, 2);

export {};
