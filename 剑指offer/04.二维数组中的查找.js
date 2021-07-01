/**
 * https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/
 * 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  let matrixRowCount = matrix.length;
  if (matrixRowCount <= 0) {
    return false;
  }
  let matrixColCount = matrix[0].length;
  let currentRowIndex = 0;
  let currentColIndex = matrixColCount - 1;
  while (currentColIndex >= 0 && currentRowIndex <= matrixRowCount - 1) {
    let current = matrix[currentRowIndex][currentColIndex]; // 获取当前左上角的元素
    if (current === target) {
      return true;
    }
    if (target < current) {
      currentColIndex--;
    } else {
      currentRowIndex++;
    }
  }
  return false;
};

let matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];

console.log(findNumberIn2DArray(matrix, 20));
