import { Controller, Get, Inject } from "@nestjs/common";
import {
    LoggerClassService,
    LoggerService,
    UseFactory,
    UseValueService,
} from "./logger.service";

@Controller("cats")
export class AppController {
    constructor(
        private readonly loggerClassService: LoggerClassService,
        private readonly loggerService: LoggerService,
        @Inject("StringToken") private useValueService: UseValueService,
        @Inject("FactoryToken") private useFactory: UseFactory
    ) {}

    @Get()
    index() {
        this.loggerClassService.log("hello loggerClassService!");
        this.loggerService.log("hello loggerService!");
        this.useValueService.log("hello useValueService!");
        this.useFactory.log("hello useFactory!");
        return "index";
    }
}
