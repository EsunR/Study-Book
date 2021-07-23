/**
 * https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
 * 找出数组中重复的数字。
   在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
 */
var findRepeatNumber = function (nums) {
  let target;
  for (let i = 0; i < nums.length; i++) {
    // 当前元素 m 如果不等于下标 i
    while (nums[i] !== i) {
      // 判断下标为 m 的元素是否与当前元素相等
      if (nums[i] === nums[nums[i]]) {
        return nums[i];
      } else {
        // 如果第 m 个位置的元素与当前元素不相等，就在当前位置放上正确的元素
        for (let j = i + 1; j < nums.length; j++) {
          if (nums[j] === i) {
            [nums[j], nums[i]] = [nums[i], nums[j]];
            break;
          }
        }
      }
    }
    if (target !== undefined) {
      break;
    }
  }
};

const nums = [0, 1, 2, 3, 4, 11, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const result = findRepeatNumber(nums);
console.log(nums);
console.log("result: ", result);
