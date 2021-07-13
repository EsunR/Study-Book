/**
 * https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
 */

/**
 * f(0) = 1
 * f(1) = 1
 * f(2) = 2
 * f(n) = f(n-1) + f(n-2)
 */

/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
  let front = 1,
    end = 1;
  for (let i = 0; i < n; i++) {
    let next = (front + end) % 1000000007;
    front = end;
    end = next;
  }
  return front;
};

let result = numWays(44);
console.log(result);
