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

class Class {
    @logged
    set x(args) {}

    @logged
    get x() {
        return 2;
    }
}

let clazz = new Class();
clazz.x = 1;
console.log(clazz.x);

export {};
