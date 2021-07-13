/**
 * https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
 * 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
 */

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
  if (m <= 0 || n <= 0 || k < 0) {
    return 0;
  }
  const visited = [];
  visited.push([0, 0].toString());
  moving([0, 0], visited, m, n, k);
  return visited.length;
};

function moving(currentIndex, visited, m, n, k) {
  let topIndex = [currentIndex[0] - 1, currentIndex[1]];
  let rightIndex = [currentIndex[0], currentIndex[1] + 1];
  let bottomIndex = [currentIndex[0] + 1, currentIndex[1]];
  let leftIndex = [currentIndex[0], currentIndex[1] - 1];
  [topIndex, rightIndex, bottomIndex, leftIndex].forEach((indexItem) => {
    if (
      isLegalIndex(indexItem, m, n, k) &&
      !visited.includes(indexItem.toString())
    ) {
      visited.push(indexItem.toString());
      moving(indexItem, visited, m, n, k);
    }
  });
}

function isLegalIndex(index, m, n, k) {
  if (index[0] < 0 || index[1] < 0 || index[0] >= m || index[1] >= n) {
    return false;
  } else {
    const result = [
      ...index[0].toString().split(""),
      ...index[1].toString().split(""),
    ].reduce((acc, item) => acc + Number(item), 0);
    return result <= k;
  }
}

const result = movingCount(5, 4, 0);
console.log("result: ", result);
