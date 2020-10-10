> 2020年9月27日 对 TypeScript 知识点进行 Review

# 1. 类

## 1.1 类的访问类型

使用 TS 定义一个简单的类：

```ts
class Person {
  name: string;
}

const person = new Person();
person.name = "EsunR";

console.log(person); // Person { name: "EsunR" }
```

- `public` 公共属性（默认）
- `private` 私有属性，只能在 **当前类** 的内部调用
- `protected` 受保护的，与私有类相似不能在外部使用，但是在继承后可以在继承的类的内部进行调用

```ts
class Person {
  private name: string;
}

class Teacher extends Person {
  sayBye() {
    console.log(this.name); // Error
  }
}
```

```ts
class Person {
  protected name: string;
}

class Teacher extends Person {
  sayBye() {
    console.log(this.name); // Success
  }
}
```

## 1.2 类的 Getter 和 Setter

```ts
class Lady {
  constructor(private _age: number) {}

  get age() {
    return this._age - 10;
  }

  set age(age: number) {
    this._age = age + 3;
  }
}

const June = new Lady(28);
console.log(June.age); // 18
June.age = 15;
console.log(June.age); // 8
```

## 1.3 抽象类和只读属性

使用只读属性：

```ts
class Person {
  public readonly _name: string;
  constructor(public name: string) {
    this._name = name;
  }
}

const person = new Person("EsunR");
console.log(person._name);
person._name = 111; // Error
```

继承抽象类的子类里，必须实现抽象类中所定义的方法：

```ts
abstract class Girl {
  abstract skill(): void;
}

class Waiter extends Girl {
  skill() {
    console.log("请喝水");
  }
}
```

# 2. TS Config

生成配置文件：

```shell
$ tsc -init
```

如何使用生成的配置文件：

```shell
$ tsc
```

但是执行完上面的指令后，会将文件夹内所有的文件都转为 ts 文件，因此我们使用 `include` 可以为其配置转换规则：

```json
{
  "include": ["demo.ts"], // 值编译 demo.ts 文件
  "exclude": ["demo.ts"], // 除了 demo.ts 文件都编译
  "files": ["demo.ts"], // 与 include 类似
  
}
```