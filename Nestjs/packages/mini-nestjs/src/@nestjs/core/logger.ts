import clc from "cli-color";

export class Logger {
    private static timestamp = new Date().valueOf();
    static log(message: string, context: string = "") {
        const timestamp = new Date().toLocaleString();
        const pid = process.pid;
        const diffTime = new Date().valueOf() - this.timestamp;
        this.timestamp = new Date().valueOf();
        console.log(
            `${clc.green("[Nest]")} ${clc.green(pid)}  - ${clc.yellow(
                timestamp
            )}     ${clc.green("LOG")} ${clc.yellow(
                `[${context}]`
            )} ${clc.green(message)} ${clc.yellow(`+${diffTime}ms`)}`
        );
    }
}
