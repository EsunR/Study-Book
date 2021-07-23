/**
 * https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (x === 0) {
    return 1;
  }
  if (n === 0) {
    return 1;
  }
  if (n > 0) {
    return powCore(x, n);
  } else {
    return 1 / powCore(x, -n);
  }
};

/**
 * f(x, n) = f(x, n/2) * f(x, n/2)
 */
function powCore(x, n) {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return x;
  }
  let result = powCore(x, parseInt(n / 2));
  result *= result;
  if (n % 2 === 1) {
    result *= x;
  }
  return result;
}

const result = myPow(2, 5);
console.log(result);
