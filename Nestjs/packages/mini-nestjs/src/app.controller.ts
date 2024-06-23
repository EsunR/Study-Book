import { Controller, Get } from "@nestjs/common";

@Controller("cats")
export class AppController {
    @Get('info') // Get 路由装饰器
    getHello(): string {
        return "Hello World!";
    }
}
