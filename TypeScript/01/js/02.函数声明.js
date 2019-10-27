"use strict";
// 为函数定义类型
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
// 可选参数（可选参数最好写在后面）
function getInfo(name, age) {
    if (age) {
        console.log("\u59D3\u540D\uFF1A" + name + "\uFF0C\u5E74\u9F84\uFF1A" + age);
    }
    else {
        console.log("\u59D3\u540D\uFF1A" + name + "\uFF0C\u5E74\u9F84\uFF1A\u4FDD\u5BC6");
    }
}
getInfo("huahua");
// 默认参数
function getInfoDefault(name, age) {
    if (age === void 0) { age = 18; }
    console.log("\u59D3\u540D\uFF1A" + name + "\uFF0C\u5E74\u9F84\uFF1A" + age);
}
// 剩余参数
function sum(base) {
    var result = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        result[_i - 1] = arguments[_i];
    }
    return base + result.reduce(function (acc, cur) { return acc + cur; });
}
console.log(sum(100, 1, 2)); // 103
function reload(str) {
    if (typeof str === "string") {
        return "我叫" + str;
    }
    else {
        return "我的年龄是" + str;
    }
}
console.log(reload("张三"));
console.log(reload(18));
// reload(true) 报错
