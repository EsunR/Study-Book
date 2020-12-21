/**
 * 数组的每个索引作为一个阶梯，第 i个阶梯对应着一个非负数的体力花费值 cost[i](索引从0开始)。
 * 每当你爬上一个阶梯你都要花费对应的体力花费值，然后你可以选择继续爬一个阶梯或者爬两个阶梯。
 * 您需要找到达到楼层顶部的最低花费。在开始时，你可以选择从索引为 0 或 1 的元素作为初始阶梯。
 *
 * dp[i][0] 表示当前台阶如果跳过，耗费的最小体力
 * dp[i][1] 表示当前台接如果不跳过，耗费的最小体力
 *
 * dp[i][0] = dp[i-1][1] （如果当前台阶跳过，说明上一个台阶没跳过）
 * dp[i][1] = min(dp[i-1][0] + cost[i], dp[i-1][1] + cost[i])
 * @param cost
 */

function minCostClimbingStairs(cost: number[]): number {
  const dp: number[][] = [];
  // 初始化第一个
  dp.push([0, cost[0]]);
  for (let i = 1; i < cost.length; i++) {
    dp.push([
      dp[i - 1][1],
      Math.min(dp[i - 1][0] + cost[i], dp[i - 1][1] + cost[i]),
    ]);
  }
  return Math.min(dp[cost.length - 1][0], dp[cost.length - 1][1]);
}

const result = minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]);

console.log(result);

export {};
