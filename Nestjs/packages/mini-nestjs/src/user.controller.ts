import { Controller, Get, Req, Request } from "@nestjs/common";
import { Request as ExpressRequest } from "express";

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
}
