import { sum } from "../utils/calculator";

test("test sum", () => {
  expect(sum(1, 2, 3)).toBe(6);
  expect(sum(1, "2", 3)).toBe(6);
  expect(() => sum(1, { name: "ming" })).toThrowError();
});
