import "reflect-metadata";

function Injectable(target: any) {
    // 什么都不做，仅用于生成元数据
}

@Injectable
class Engine {
    start() {
        console.log("Engine started");
    }
}

@Injectable
class Car {
    constructor(private engine: Engine) {}
    drive() {
        this.engine.start();
        console.log("Car is driving");
    }
}

// 定义一个依赖注入的容器类
class DIContainer {
    // 存储所有服务的 Map 对象
    private services = new Map<string, any>();

    // 注册服务
    register<T>(name: string, Service: new (...args: any[]) => T) {
        // 把类的名称和构造函数存放到 map 中
        this.services.set(name, Service);
    }

    // 解析服务的方法，根据名称返回服务的实例
    resolve<T>(name: string) {
        // 获取服务的实现类
        const Service = this.services.get(name);
        // 获取实现类的构造函数的类型数组
        const dependencies =
            Reflect.getMetadata("design:paramtypes", Service) || [];
        const injections = dependencies.map((dependency: any) =>
            this.resolve(dependency.name)
        );
        return new Service(...injections);
    }
}

// 创建一个依赖注入的容器实例
const container = new DIContainer();
container.register<Engine>("Engine", Engine);
container.register<Car>("Car", Car);

const car = container.resolve<Car>("Car");
car.drive();
