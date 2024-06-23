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
} from "@nestjs/common";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";

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
        @Session() session: any,
        @Session("pageView") pageView: string
    ) {
        console.log("session", session);
        console.log("pageView", pageView);
        if (session.pageView) {
            session.pageView++;
        } else {
            session.pageView = 1;
        }
        return `session pageView: ${pageView}`;
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
    createUser(@Body() createUserDto, @Body("username") username: string) {
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
}
