"use strict";
var A;
(function (A) {
    var Dog = /** @class */ (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.run = function () {
            console.log("dadadadadada");
        };
        return Dog;
    }());
    A.Dog = Dog;
})(A || (A = {}));
var B;
(function (B) {
    var Dog = /** @class */ (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.bark = function () {
            console.log("wang!");
        };
        return Dog;
    }());
    B.Dog = Dog;
})(B || (B = {}));
var dog_1 = new A.Dog("huahua");
dog_1.run();
var dog_2 = new B.Dog("langlang");
dog_2.bark();
