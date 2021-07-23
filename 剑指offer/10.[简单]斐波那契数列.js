/**
 * https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
 * 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：
 */

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  const result = [];
  for (let i = 0; i <= n; i++) {
    if (i === 0) {
      result.push(0);
      continue;
    } else if (i === 1) {
      result.push(1);
      continue;
    } else {
      result.push(result[i - 1] + result[i - 2]);
    }
  }
  console.log(result);
  return result.pop();
};

const result = fib(45);
console.log(result);
