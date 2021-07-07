/**
 * https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，
 * 输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。
 */

/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  let low = 0;
  let high = numbers.length - 1;
  // 知道 low 和 high 的指向重合才停止循环
  while (low < high) {
    // 中间索引向下取整，防止 [1,0] 这种情况，low = pivot + 1 时直接越位
    const pivot = low + Math.floor((high - low) / 2);
    if (numbers[pivot] < numbers[high]) {
      high = pivot;
    } else if (numbers[pivot] > numbers[high]) {
      low = pivot + 1;
    } else {
      // 当中间元素与前后指向的元素相等时，无法判断其归属序列，那就将 high 的指针向前移动
      // 直到 pivot 指针指到最小的元素，high 指针移动到改元素上
      high -= 1;
    }
  }
  // 返回重合时指向的元素
  return numbers[low];
};

function minInOrder(arr, startIndex, endIndex) {
  for (let i = startIndex + 1; i < endIndex + 1; i++) {
    if (arr[i] < arr[i - 1]) {
      return arr[i];
    }
  }
  return arr[startIndex];
}

const result = minArray([1, 0, 1]);
console.log(result);
