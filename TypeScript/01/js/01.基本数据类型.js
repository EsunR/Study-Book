"use strict";
// 布尔
var isDone = false;
console.log('isDone: ', isDone);
// 数字
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
console.log('octalLiteral: ', octalLiteral);
// 字符
var username = "bob";
console.log('username: ', username);
// 数组
// let arrList: number[] = [1, 2, 3]
var arrList = [1, 2, 3];
console.log('arrList: ', arrList);
// 元组
var x = ['hello', 123];
console.log('x: ', x);
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 4] = "Green";
    Color[Color["Blue"] = 5] = "Blue";
})(Color || (Color = {}));
var c;
c = Color.Red; // 0
c = Color.Green; // 4
c = Color.Blue; // 5
var colorName = Color[4]; // Green
// 任意值
var notSure = 4;
notSure = "may be a string";
console.log('notSure: ', notSure);
var anyArr = ["str", 1, true];
// 空值
function warnUser() {
    console.log("this is a function");
}
warnUser();
// null 和 undefined
var u = undefined;
var n = null;
var num;
console.log(num); // undefined
//  Never
function error(message) {
    throw new Error(message);
}
// error("错误")
// Object
var obj = {
    name: "huahua",
    age: 18
};
console.log(obj);
// 断言
var someValue = "this is a string";
var stringLength = someValue.length;
