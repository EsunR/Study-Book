function add(x: number, y: number, z?: number): number {
  if (typeof z === "number") {
    return x + y + z;
  } else {
    return x + y;
  }
}

add(2, 3);
add(2, 3, 4);

let add2: (a: number, b: number) => number;
add2 = add;
