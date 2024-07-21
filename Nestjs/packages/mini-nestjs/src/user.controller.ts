import {
    Controller,
    Get,
    Post,
    Req,
    Request,
    Query,
    Headers,
    Session,
    Ip,
    Param,
    Body,
    Res,
    Next,
    Redirect,
    HttpCode,
    Header,
} from "@nestjs/common";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction as ExpressNextFunction,
} from "express";
import { User } from "./user.decorator";

@Controller("user")
export class UserController {
    @Get("req")
    handleRequest(
        @Req() req: ExpressRequest,
        age: number,
        @Request() request: ExpressRequest
    ) {
        console.log(age);
        console.log(req.url);
        console.log(req.path);
        console.log(req.method);
        return "handleRequest";
    }

    @Get("query")
    handleQuery(@Query() query: any, @Query("id") id: string) {
        console.log("query", query);
        console.log("id", id);
        return `query id: ${id}`;
    }

    @Get("headers")
    handleHeaders(@Headers() headers: any, @Headers("accept") accept: string) {
        console.log("headers", headers);
        console.log("accept", accept);
        return `header accept: ${accept}`;
    }

    @Get("session")
    handleSession(
        @Session() session: Record<string, any>
        // @Session("pageView") pageView: string
    ) {
        console.log("session", session);
        // console.log("pageView", pageView);
        if (session.pageView) {
            session.pageView++;
        } else {
            session.pageView = 1;
        }
        return `session pageView: ${session.pageView}`;
    }

    @Get("ip")
    getIp(@Ip() ip: string) {
        console.log("ip", ip);
        return `ip: ${ip}`;
    }

    @Get(":username/info/:age")
    getUserNameInfo(
        @Param() params: any,
        @Param("username") userName: string,
        @Param("age") age: string
    ) {
        console.log("params", params);
        console.log("userName", userName);
        console.log("age", age);
        return `username: ${userName}, age: ${age}`;
    }

    @Get("star/ab*de")
    handleWildcard() {
        return "handleWildcard";
    }

    @Post("create")
    @HttpCode(200)
    @Header("Cache-Control", "none")
    @Header("key1", "value1")
    createUser(@Body() createUserDto: any, @Body("username") username: string) {
        console.log("createUserDto", createUserDto);
        console.log("username", username);
        return "user created";
    }

    @Get("response")
    response(@Res() res: ExpressResponse) {
        res.send("response");
    }

    @Get("passthrough")
    passthrough(@Res({ passthrough: true }) res: ExpressResponse) {
        res.setHeader("key", "value");
        return "passthrough";
    }

    @Get("next")
    next(@Next() next: ExpressNextFunction) {
        next();
    }

    @Get("/redirect")
    @Redirect("/user/req", 301)
    handelRedirect() {}

    @Get("/redirect2")
    @Redirect("/user", 301)
    handelRedirect2(@Query("version") version: string) {
        return { url: `https://docs.nestjs.com/v${version}`, statusCode: 301 };
    }

    @Get("customParamDecorator")
    @Redirect("/user/req", 301)
    customParamDecorator(@User("role") user: any) {
        return user;
    }
}
