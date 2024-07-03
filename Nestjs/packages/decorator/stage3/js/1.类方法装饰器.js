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
    sum(a, b) {
        return a + b;
    }
}

Cat.prototype.sum =
    logged(Cat.prototype.sum, { kind: "method", name: "sum" }) ??
    Cat.prototype.sum;

new Cat().sum(1, 2);
