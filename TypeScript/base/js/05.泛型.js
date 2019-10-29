"use strict";
// 1. 泛型：可以支持不特定的数据类型
// 要求传入的阐述和返回的参数一致
function getData(value) {
    return value;
}
console.log(getData(123));
// 2. 泛型类
// 有个最小堆算法，需要同时支持返回数字和字符串两种类型
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = [];
    }
    MinClass.prototype.add = function (num) {
        this.list.push(num);
    };
    MinClass.prototype.min = function () {
        return this.list.reduce(function (pre, cur) {
            return pre < cur ? pre : cur;
        });
    };
    return MinClass;
}());
var m = new MinClass();
m.add(2);
m.add(3);
m.add(1);
m.add(6);
console.log(m.min());
// 泛型类
// 泛型类
var DbUser = /** @class */ (function () {
    function DbUser() {
    }
    return DbUser;
}());
var Article = /** @class */ (function () {
    function Article() {
    }
    return Article;
}());
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (data) {
        console.log(data);
        return true;
    };
    return MysqlDb;
}());
var us = new DbUser();
us.username = "张三";
us.password = "123456";
var a = new Article();
a.title = "国内";
a.desc = "国内新闻";
a.status = 1;
var udb = new MysqlDb();
udb.add(us);
var adb = new MysqlDb();
adb.add(a);
var ArticleCate = /** @class */ (function () {
    function ArticleCate(params) {
        this.title = params.title;
        this.desc = params.desc;
        this.status = params.status;
    }
    return ArticleCate;
}());
var a = new ArticleCate({
    title: "分类",
    desc: "111"
});
var adb2 = new MysqlDb();
adb2.add(a);
