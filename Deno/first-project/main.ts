// @deno-types="npm:@types/lodash-es"
import * as _ from "npm:lodash-es";

export function add(a: number, b: number): number {
    return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Add 2 + 3 =", add(2, 3));
    // console.log("Lodash tools 2 + 3 =", _.add(1, 2));
    console.log("Lodash tools 3 / 2 =", _.divide(3, 2));
}
