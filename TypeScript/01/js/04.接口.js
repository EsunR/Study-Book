"use strict";
// 对传入对象的约束
function printLabel(labelInfo) {
    console.log(labelInfo.label);
}
printLabel({ label: "出现错误" });
function printUser(user) {
    console.log("user name:", user.name);
    console.log("user age:", user.age);
}
printUser({ name: "huahua", age: 18 });
var md5 = function (key, value) {
    return key + value;
};
var sha1 = function (key, value) {
    return key + "---" + value;
};
console.log(md5("name", "张三"));
var arr = ["123", "456"];
console.log(arr[0]);
var userobj = {
    "name": "花花",
    "age": "18",
};
var Cat = /** @class */ (function () {
    function Cat(name) {
        this.name = name;
    }
    Cat.prototype.eat = function (food) {
        console.log(this.name + "\u5403" + food);
    };
    return Cat;
}());
var cat = new Cat("大花猫");
cat.eat("鱼罐头");
var Human = /** @class */ (function () {
    function Human(name) {
        this.name = name;
    }
    Human.prototype.eat = function () {
        console.log("吃饭");
    };
    Human.prototype.work = function () {
        console.log("写代码");
    };
    return Human;
}());
var human = new Human("huahua");
human.eat();
human.work();
