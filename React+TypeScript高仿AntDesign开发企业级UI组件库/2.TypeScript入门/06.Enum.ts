enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
console.log(Direction.Up); // "UP"
console.log(Direction["Up"]); // "UP"
console.log(Direction[0]); // undefined

let result = "UP";
if (result !== Direction.Up) {
  console.log("result error");
}
