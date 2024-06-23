# 1. NestJS 快速开始

初始化入口：

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/** 用于创建实例，启动服务 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
```

创建 module：

```ts
import { AppController } from "./app.controller";
import { Module } from "@nestjs/common";

@Module({
    controllers: [AppController],
})
export class AppModule {}
```

创建 controller：

```ts
import { Controller, Get } from "@nestjs/common";

@Controller('/a')
export class AppController {
    @Get('/b') // Get 路由装饰器
    getHello(): string {
        return "Hello World!";
    }
}
```

@Controller 是一个装饰器，用于定义控制器。控制器是处理传入的 HTTP 请求的核心组件，每个控制器负责处理特定的请求路径和对应的 HTTP 方法，在控制器内部会使用装饰器，如 @Get、@Post 等来创建路由处理器。

访问 `http://localhost:3000/a/b` 即可访问创建的 Get 接口。

> @Controller 和 @Get 装饰器传参如果为空时，默认为 `/`


# 2. Reflect 与 reflect-metadata

Reflect 是 ES6 新引入的一个内置对象，提供一些反射方法。其实以前这些方法都分散在 Object 或者 Function 上，如 `Object.property.get.call(obj, "a")` 我就可以使用 `Reflect.get(obj, "a")` 来得到同样的效果。

reflect-metadata 是一个用于 TS 和 ECMA 的元数据反射库提案，它通过提供对元数据定义和检查的支持，简化了装饰器的使用，可以在类、方法、参数、属性上获取和设置元数据

```ts
import "reflect-metadata";

class MyClass {
    private myProperty: string;

    constructor(value: string) {
        this.myProperty = value;
    }

    /**
     * @Reflect.metadata("customKey", "customValue") 其实是一个语法糖，用于简化我们对元数据的操作
     * 等同于 Reflect.defineMetadata("customKey", "customValue", MyClass.prototype, "myMethod");
     */
    @Reflect.metadata("customKey", "customValue")
    myMethod() {
        console.log("exclude myMethod");
    }
}

const instance = new MyClass("myValue");

// 定义元数据：给 instance 上的 myProperty 属性定义元数据，属性名为 key1，值为 value1
Reflect.defineMetadata("key1", "value1", instance, "myProperty");

// 检查是否具有指定的元数据
const hasMetadata = Reflect.hasMetadata("key1", instance, "myProperty");
console.log("Has metadata key1 for myProperty:", hasMetadata); // true

// 获取元数据
const metadataValue = Reflect.getMetadata("key1", instance, "myProperty");
console.log("Metadata key1 value for myProperty:", metadataValue); // value1

// 获取自有元数据（针对方法的）
const ownMetadataValue = Reflect.getOwnMetadata(
    "customKey",
    // @ts-ignore
    Reflect.getPrototypeOf(instance), // 或者 instance.__proto__
    "myMethod"
);
console.log("Own metadata customKey value for myMethod:", ownMetadataValue); // customValue

// 删除元数据
Reflect.deleteMetadata("key1", instance, "myProperty");
const hasMetadataAfterDelete = Reflect.hasMetadata("key1", instance, "myProperty");
console.log(
    "Has metadata key1 for myProperty after delete:",
    hasMetadataAfterDelete
); // false
```

# 3. 装饰器

NestJS 的核心就是 Express + 装饰器。

## 3.1 装饰器的分类

1. **类装饰器（Class Decorators）**：应用于类构造函数，可以用于修改类的定义。
2. **方法装饰器（Method Decorators）**：应用于方法，可以用于修改方法的行为。
3. **访问器装饰器（Accessor Decorators）**：应用于类的访问器属性（getter 或 setter）。
4. **属性装饰器（Property Decorators）**：应用于类的属性。
5. **参数装饰器（Parameter Decorators）**：应用于方法参数。

| 装饰器名称                       | 装饰器描述                        | 装饰器的参数说明                                                              |
| --------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| 类装饰器（Class Decorators）      | 应用于类构造函数，可以用于修改类的定义。         | `constructor: Function`                                               |
| 方法装饰器（Method Decorators）    | 应用于方法，可以用于修改方法的行为。           | `target: Object, propertyKey: string, descriptor: PropertyDescriptor` |
| 访问器装饰器（Accessor Decorators） | 应用于类的访问器属性（getter 或 setter）。 | `target: Object, propertyKey: string, descriptor: PropertyDescriptor` |
| 属性装饰器（Property Decorators）  | 应用于类的属性。                     | `target: Object, propertyKey: string`                                 |
| 参数装饰器（Parameter Decorators） | 应用于方法参数。                     | `target: Object, propertyKey: string, parameterIndex: number`         |

## 3.2 装饰器的应用

### 类装饰器

```ts
// 用例1：基础使用
function logClass(constructor: Function) {
    console.log("constructor:", constructor.name);
}

@logClass // 类创建后即输出 log
class Person {
    constructor() {}
}

// 用例2：类装饰器工厂，是一个返回装饰器的函数，可以接受参数来控制装饰器的行为
function logClassWithParams(message: string) {
    return function (constructor: Function) {
        console.log(constructor.name, message);
    };
}

@logClassWithParams("Class Created")
class Car {
    constructor() {}
}

// 用例3：装饰器扩展类的功能，比如可以为类添加新的属性和方法
function addTimestamp<
    // {} 表示一个最简单最松散的对象，代表里面没有属性也可能拥有任意属性
    T extends { new (...args: any[]): {} }
>(constructor: T) {
    return class extends constructor {
        timestamp = Date.now();
    };
}

@addTimestamp
class Doc {
    constructor(public title: string) {}
}
interface Doc {
    timestamp: number;
}

const doc = new Doc("My Document");
console.log(doc.title); // My Document
console.log(doc.timestamp); // 1628900000000

// 用例4：为类属性设定默认值
function defaultValue(defaults: Record<string, any>) {
    return function <T extends new (...args: any[]) => {}>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                Object.keys(defaults).forEach((key) => {
                    if ((this as any)[key] === undefined) {
                        (this as any)[key] = defaults[key];
                    }
                });
            }
        };
    };
}

@defaultValue({ title: "Default Title" })
class Doc {
    title?: string;
}

const doc = new Doc();
console.log(doc.title); // Default Title
```

### 方法装饰器

```ts
/**
 * 用例1：日志记录
 * @param target 装饰的目标对象如果是静态成员，则是类的构造函数(Calculator)，如果是实例成员，则是类的原型对象(Calculator.prototype)
 * @param propertyKey 装饰的成员名称
 * @param descriptor 成员的属性描述符
 */
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 获取老的函数
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with arguments: ${args}`);
        const result = originalMethod.apply(this, args);
        console.log(`Result: ${result}`);
        return result;
    };
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

const calculator = new Calculator();
calculator.add(2, 3);

/**
 * 用例2：可以在方法调用前，检查用户的权限，决定是否可以调用
 */
function authorize(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const USERS: Record<string, { roles: any[] }> = {
        "001": { roles: ["admin"] },
        "002": { roles: ["member"] },
    };

    // 获取老的函数
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        let user = USERS[args[0] as string];
        if (user && user.roles.includes("admin")) {
            // return originalMethod.apply(this, args);
            return Reflect.apply(originalMethod, this, args);
        } else {
            throw new Error("Unauthorized");
        }
    };
    return descriptor;
}

class AdminPanel {
    @authorize
    deleteUser(userId: string) {
        console.log(`Deleting user with ID: ${userId}`);
    }
}
const adminPanel = new AdminPanel();
adminPanel.deleteUser("001");

/**
 * 用例3：实现缓存结果
 * 在斐波那契数列中，会存在大量重复计算，可以创建一个缓存 Map 来获取已经计算过的值，从而提升型能
 */
function cache(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, any>();
    descriptor.value = function (...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

class MathOperations {
    // 计算斐波那契数列
    @cache
    factorial(n: number): number {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
}
const mathOperations = new MathOperations();
console.log(mathOperations.factorial(5)); // 120
console.log(mathOperations.factorial(5)); // 会获取缓存
```

### 属性装饰器

```ts
import "reflect-metadata";

/**
 * 用例1：要求创建实例时，必须对实例属性进行赋值
 * @param target 装饰的目标对象，对于静态属性来说就是类的构造函数(User)，对于实例属性来说就是类的原型对象(User.prototype)
 * @param propertyKey 装饰的属性名称
 */
function required(target: any, propertyKey: string) {
    // 添加元数据，就是给类的原型对象的 username 属性添加元数据， required: true
    Reflect.defineMetadata("required", true, target, propertyKey);
}

function validate(user: User) {
    for (let key in user) {
        // 如果标记了为必填，但值是空的，就报错
        if (
            Reflect.getMetadata("required", user, key) &&
            !user[key as keyof User]
        ) {
            throw new Error(`Property ${key} is required`);
        }
    }
}

class User {
    @required
    username?: string = undefined;
}

const user = new User();
user.username = "Job";
validate(user);

/**
 * 用例2：实现属性装饰器来进行访问控制或者设置初始设置
 */
function defaultValue(value: any) {
    return function (target: any, propertyKey: string) {
        let val = value;
        const getter = function () {
            return val;
        };
        const setter = function () {
            val = value;
        };
        // 备注：这个方法去设置默认值只能在低版本的 ES 规范中可行，如 ES2021
        // (这里的 target 指的是 Settings.property)
        // 因为在高版本的 ES 规范中，类的属性是定义在实例上的，并不在 property 上
        // 所以更好的方案是使用类装饰器（上类装饰器的用例4）
        Object.defineProperty(target, propertyKey, {
            enumerable: true,
            configurable: true,
            get: getter,
            set: setter,
        });
    };
}

class Settings {
    @defaultValue("dark")
    theme?: string;
    @defaultValue(30)
    timeout?: number;
}

const settings = new Settings();
console.log(settings.theme);
console.log(settings.timeout);
```

### 参数装饰器

```ts
import "reflect-metadata";
const REQUIRED_PARAMETERS = "required_parameters";

/**
 * 用例：校验方法的必填参数
 * @param target 装饰的目标对象，对于静态成员来说就是类的构造函数，对于实例成员来说就是类的原型对象
 * @param propertyKey 参数所述的方法名称
 * @param parameterIndex 参数的索引
 */
function requiredParam(
    target: any,
    propertyKey: string,
    parameterIndex: number
) {
    const existingRequiredParameters: number[] =
        Reflect.getOwnMetadata(REQUIRED_PARAMETERS, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(
        REQUIRED_PARAMETERS,
        existingRequiredParameters,
        target,
        propertyKey
    );
}

function validateParams(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const requiredParameters: number[] =
            Reflect.getOwnMetadata(REQUIRED_PARAMETERS, target, propertyKey) ||
            [];
        for (let parameterIndex of requiredParameters) {
            if (args[parameterIndex] === undefined) {
                throw new Error(
                    `Missing required parameter at index ${parameterIndex}`
                );
            }
        }
        return originalMethod.apply(this, args);
    };
}

class UserOp {
    constructor(private name: any, private age: any) {}

    @validateParams
    setName(@requiredParam newName?: any, @requiredParam newAge?: any) {
        this.name = newName;
        this.age = newAge;
    }
}

const userOp = new UserOp("Job", 18);
userOp.setName("Bob", 18);
userOp.setName(undefined); // Missing required parameter at index 0
userOp.setName("Bob"); // Missing required parameter at index 1
```

> 属性装饰器由于没有在 nestjs 中使用，因此暂时不进行扩展

## 3.3 执行顺序

1. 属性装饰器、方法装饰器、访问器装饰器他们是按照在类中出现的顺序，从上往下依次执行；
2. 类装饰器最后执行；
3. 参数装饰器优先于方法；
4. 实例属性的装饰器优于静态属性的装饰器调用；
5. 如果一个方法有多个参数，参数装饰器会**从右向左**执行，一个参数也可能有多个装饰器，这些装饰器也是从右向左执行的；

# 4. Nest 服务器的搭建

在 Nest 的入口文件中，调用了 `NestFactory` 函数并传入一个 `AppModule` 对象用于创建 Nest 服务。

```ts
// main.ts
export class NestFactory {
    static async create(module: any) {
        // 启动 Nest 应用
        Logger.log("Starting Nest application...", "NestFactory");
        // 创建 Nest 应用实例
        const app = new NestApplication(module);
        app.init();
        // 返回 nest 应用实例
        return app;
    }
}

// app.module.ts
@Module({
    controllers: [AppController],
})
export class AppModule {}
```

`NestFactory` 是一个工厂函数，内部对 `NestApplication` 进行了实例化，并将传入的 module 作为构造函数的入参，最终对外返回创建好的 app 实例：

```ts
export class NestFactory {
    static async create(module: any) {
        // 创建 Nest 应用实例
        const app = new NestApplication(module);
        app.init();
        // 返回 nest 应用实例
        return app;
    }
}
```

`NestApplication` 类负责了 app 实例的创建，在其初始化时通过调用 Express 创建 app 实例的 api 来创建一个服务：

> 真正的源码内部还有一层适配器层，用以让 `NestApplication` 可以调用不同的 Nodejs web 框架，但是在此我们简化了适配器层，仅考虑使用 Express 的情况。

```ts
export class NestApplication {
    // 在内部私有化一个 Express 实例
    private readonly app: Express = express();

    constructor(protected readonly module) {}

	async init() {
		// ... ...
	}

	// 启动服务
    async listen(port: number) {
        this.app.listen(port, () => {
            Logger.log(
                `Server is running on http://localhost:${port}`,
                "NestApplication"
            );
        });
    }
}
```

可以看出，Nest 并不负责实现具体的 NodeJS 服务创建，其更多的是基于 Express 来做一些事情和模块设计。

# 5. 路由的解析

我们先来梳理一下 NestJS 的模块层级：

![](https://esunr-image-bed.oss-cn-beijing.aliyuncs.com/picgo/20240623165805.png)

可以看出，在模块加载时，使用了 `@Module` 装饰器的 `controller` 参数来声明每个模块下的控制器。而具体的 HTTP 路由是根据控制器的 `@Controller` 和 `@Get` 两个装饰器来生成的，路由路径是由装饰器的参数拼接得来的。

在内部实现上，为了在 `NestApplication` 的初始化阶段获取到模块的所有控制器，因此 `@Module` 装饰器需要在 `AppModule` 类上挂载元数据：

```ts
// module.decorator.ts
import "reflect-metadata";

interface ModuleMetadata {
    controllers: Function[];
}

// 定义模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target: Function) => {
        // 给模块类添加装饰器
        Reflect.defineMetadata("controllers", metadata.controllers, target);
    };
}
```

然后就可以在 `NestApplication` 的 `init` 函数中拿到控制器，进而来处理控制器的操作：

```ts
// nest-application.ts
async init() {
	const controllers = Reflect.getMetadata("controllers", this.module) || [];
	for (const Controller of controllers) {
		// 注册路由
	}
}
```

在 `@Controller` 和 `@Get`  装饰器中，同样使用 `Reflect.setMetaData` 的方式来记录路由的路径信息以及请求方法，然后在需要时就可以使用 `Reflect.getMetaData` 来获取路由信息：

```ts
// 遍历控制器后要做的事情：
const controller = new Controller();
// 获取控制器的路径前缀
const prefix = Reflect.getMetadata("prefix", Controller) || "/";
const controllerPrototype = Controller.prototype;
// 遍历类的原型上的方法名(包含 constructor (constructor 指向类本身))
for (const methodName of Object.getOwnPropertyNames(
	controllerPrototype
)) {
	// 获取原型上的方法
	const method = controllerPrototype[methodName];
	const httpMethod = Reflect.getMetadata("method", method);
	// 如果没有配置路由装饰器，则跳过
	if (!httpMethod) continue;
	const pathMetadata = Reflect.getMetadata("path", method);
	const routePath = path.posix.join("/", prefix, pathMetadata);
	// express api 注册路由
	this.app[httpMethod.toLowerCase()](/** 传入参数信息 */)
}
```

# 6. 参数装饰器

NestJS 设计了参数装饰器来让我们在 Controller 函数中可以获取到所需的参数对象。比如我们期望在 Controller 函数中拿到 Request 请求对象，就可以使用 `@Request` 或 `@Req` 装饰器来装饰参数，那么这个参数就表示 `Request` 对象：

```ts
@Controller("user")
export class UserController {
    @Get("req")
    handleRequest(
        @Request() request: ExpressRequest
    ) {
        console.log(request.url)
        console.log(request.path)
        console.log(request.method)
        return "handleRequest";
    }
}
```

实现上，`@Request` 装饰器负责定义一个 key，将其写入到该控制器类的方法的 metadata 上，并用一个数组进行保存：

```ts
import "reflect-metadata";

export const createParamDecorator = (key: string) => {
    return () =>
        /**
         * @param target 控制器原型
         * @param propertyKey 方法名
         * @param parameterIndex 参数索引（先走1再走0）
         */
        (target: any, propertyKey: string, parameterIndex: number) => {
            // 给控制器类的原型的 propertyKey 也就是 handleRequest 方法属性上添加元数据
            // 属性名是 params: handleRequest，值是一个数组
            const existingParameters =
                Reflect.getMetadata("params", target, propertyKey) || [];
            existingParameters.push({ parameterIndex, key });
            Reflect.defineMetadata(
                "params",
                existingParameters,
                target,
                propertyKey
            );
        };
};

export const Request = createParamDecorator("Request");

export const Req = Request;
```

在调用 express api 来注册路由时，就可以通过上面记录的元数据信息，对参数进行排序，然后传入即可。