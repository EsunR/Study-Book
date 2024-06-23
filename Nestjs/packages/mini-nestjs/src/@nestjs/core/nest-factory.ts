import { Logger } from "./logger";
import { NestApplication } from "./nest-application";

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
