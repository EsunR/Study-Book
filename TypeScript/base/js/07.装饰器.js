"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 0. 装饰器
function f() {
    console.log("f() defined");
    return function () {
        console.log("f() called");
    };
}
function g() {
    console.log("g() defined");
    return function () {
        console.log("g() called");
    };
}
// class C {
//   @f()
//   @g()
//   method() { }
// }
// 1. 类装饰器
function logClass(params) {
    // params是传入装饰器的参数
    return function (target) {
        // target 是类本身
        console.log("params:", params);
        console.log("target", target);
        target.prototype.apiUrl = "https://www.esunr.xyz";
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () { };
    HttpClient = __decorate([
        logClass("abc")
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
console.log(http.apiUrl);
// 使用类装饰器重载类的构造函数或方法
function classDecorator(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newProperty = "new property";
            _this.hello = "override";
            return _this;
        }
        return class_1;
    }(constructor));
}
var Greeter = /** @class */ (function () {
    function Greeter(m) {
        this.property = "property";
        this.hello = m;
    }
    Greeter = __decorate([
        classDecorator
    ], Greeter);
    return Greeter;
}());
var greeter = new Greeter("message");
console.log(greeter.hello); // override
console.log(greeter.newProperty); // new property
// 2. 属性装饰器
function propertyDecorator(params) {
    return function (target, attr) {
        target[attr] = params;
    };
}
var Loger = /** @class */ (function () {
    function Loger() {
    }
    Loger.prototype.getLog = function () {
        console.log(this.msg);
    };
    __decorate([
        propertyDecorator("test")
    ], Loger.prototype, "msg", void 0);
    return Loger;
}());
var loger = new Loger();
loger.getLog(); // test
// 方法装饰器
function get(params) {
    return function (target, methodName, desc) {
        // target 在实例成员上是原型对象
        // 修改装饰器的方法，吧装饰器方法里面传入的所有参数改为 string 类型
        // 1. 保存当前的方法
        var oMethod = desc.value;
        // 2. 改造方法
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (value) {
                return String(value);
            });
            console.log(args);
            // 3. 继续执行原方法
            oMethod.apply(this, args);
        };
    };
}
var HttpClient2 = /** @class */ (function () {
    function HttpClient2(url) {
        this.url = url;
    }
    HttpClient2.prototype.getData = function () {
        console.log("我是 get data 的方法");
    };
    __decorate([
        get("new data")
    ], HttpClient2.prototype, "getData", null);
    return HttpClient2;
}());
var httpclient = new HttpClient2("old data");
httpclient.getData("111", 132); // ["111", "123"] 我是get data 的方法
// 方法参数装饰器
function logParams(params) {
    console.log(params);
    return function (target, methodName, paramsIndex) {
        target.newUrl = "new url";
        console.log(methodName);
        console.log(paramsIndex);
    };
}
var HttpClient3 = /** @class */ (function () {
    function HttpClient3(url) {
        this.url = url;
    }
    HttpClient3.prototype.getData = function (url) {
        console.log("\u6211\u662F get data \u7684\u65B9\u6CD5 " + url);
    };
    __decorate([
        __param(0, logParams('url'))
    ], HttpClient3.prototype, "getData", null);
    return HttpClient3;
}());
var httpclient3 = new HttpClient3("new data");
httpclient3.getData("get data");
// 执行顺序：参数装饰器、方法执行装饰器、访问符装饰器、属性装饰器
