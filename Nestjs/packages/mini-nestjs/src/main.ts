import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session";

/** 用于创建实例，启动服务 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            secret: "your-secret-key",
            resave: false, // 在每次请求结束后是否强制保存回话，即使它没有改变
            saveUninitialized: false, // 是否保存为初始化的会话
            cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 设置回话的有效时间
        })
    );
    await app.listen(3000);
}

bootstrap();
