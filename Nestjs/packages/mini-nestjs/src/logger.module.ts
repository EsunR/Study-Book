import { Module } from "@nestjs/common";
import {
    LoggerClassService,
    LoggerService,
    UseFactory,
    UseValueService,
} from "./logger.service";

@Module({
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
            useFactory: () => new UseFactory(),
        },
    ],
    exports: [
        "SUFFIX",
        LoggerClassService,
        LoggerService,
        "StringToken",
        "FactoryToken",
    ],
})
export class LoggerModule {}
