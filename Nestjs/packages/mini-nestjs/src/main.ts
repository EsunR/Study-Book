import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/** 用于创建实例，启动服务 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
