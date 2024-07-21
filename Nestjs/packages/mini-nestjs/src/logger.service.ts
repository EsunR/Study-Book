import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class LoggerClassService {
    log(message: string) {
        console.log("LoggerClassService", message);
    }
}

@Injectable()
export class LoggerService {
    constructor(@Inject("SUFFIX") private suffix: string) {
        console.log("LoggerService constructor", suffix);
    }
    log(message: string) {
        console.log("LoggerService", message);
    }
}

@Injectable()
export class UseValueService {
    log(message: string) {
        console.log("UseValueService", message);
    }
}

@Injectable()
export class UseFactory {
    constructor(prefix1, prefix2) {
        console.log("UseFactory constructor", prefix1, prefix2);
    }
    log(message: string) {
        console.log("UseFactory", message);
    }
}
