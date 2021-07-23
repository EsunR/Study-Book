/**
 * https://leetcode-cn.com/problems/jian-sheng-zi-lcof/
 * 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
 */

/**
 * f(n) = Max(f(1)*f(n-1), f(2)*f(n-2), ... , f(Math.floor(n/2))*f(Math.ceil(n/2)))
 */

/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
  const calcStack = [];
  if (n === 2) {
    return 1;
  } else if (n === 3) {
    return 2;
  }
  calcStack[0] = 0;
  calcStack[1] = 1;
  calcStack[2] = 2;
  calcStack[3] = 3;
  let i = 4;
  while (i <= n) {
    let max = 0;
    for (let j = 1; j <= i / 2; j++) {
      const current = calcStack[j] * calcStack[i - j];
      max = Math.max(current, max);
    }
    calcStack[i++] = max;
  }
  return calcStack[n];
};

const result = cuttingRope(4);
console.log(result);
