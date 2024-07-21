import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserController } from "./user.controller";
import {
    LoggerClassService,
    LoggerService,
    UseValueService,
    UseFactory,
} from "./logger.service";

@Module({
    controllers: [AppController, UserController],
    providers: [
        {
            provide: "SUFFIX",
            useValue: "suffix",
        },
        LoggerClassService,
        {
            provide: LoggerService,
            useClass: LoggerService,
        },
        // 实例模式
        {
            provide: "StringToken", // provider 的名称
            useValue: new UseValueService(), // 直接提供一个实例
        },
        // 工厂函数模式
        {
            provide: "FactoryToken",
            inject: ["prefix1", "SUFFIX" /** 可以使用 token 来读取依赖 */],
            useFactory: (prefix1, prefix2) => new UseFactory(prefix1, prefix2),
        },
    ],
})
export class AppModule {}
