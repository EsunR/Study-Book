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
// 1. 定义类
var Person = /** @class */ (function () {
    function Person(n) {
        this.name = n;
    }
    Person.prototype.run = function () {
        console.log(this.name);
    };
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    return Person;
}());
var person = new Person("huahua");
person.run();
person.setName("张三");
console.log(person.getName());
// 2. 类继承
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    return Web;
}(Person));
var w = new Web("李四");
w.run();
// 3. 类里面的修饰符
/**
 * public：公有           类里面、子类、类外面都可以访问
 * protected：保护类型     类里面、子类里面可以访问，在类外部没法访问
 * private：私有          类里面可以访问，子类、类外部都没法访问
 *
 * 变量前没有加修饰符默认就是公有
 */
// 4. 静态属性与静态方法
var Person2 = /** @class */ (function () {
    function Person2(name) {
        this.name = name;
    }
    // 实例方法
    Person2.prototype.run = function () {
        console.log(this.name);
    };
    Person2.print = function () {
        // 静态方法中不可以调用属性，只可用静态属性
        console.log("静态方法取静态属性：", this.age);
    };
    Person2.age = 18;
    return Person2;
}());
Person2.print();
console.log(Person2.age);
// 5. 多态 （抽象类）
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.eat = function () {
        console.log(this.name + "吃肉肉");
    };
    return Dog;
}(Animal));
var dog = new Dog("汪汪");
dog.eat();
