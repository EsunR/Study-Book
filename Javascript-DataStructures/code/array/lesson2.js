/**
给定一副牌，每张牌上都写着一个整数。

此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

每组都有 X 张牌。
组内所有的牌上都写着相同的整数。
仅当你可选的 X >= 2 时返回 true。

示例 1：

输入：[1,2,3,4,4,3,2,1]
输出：true
解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
*/


// 存在问题：过多数据会导致内存溢出
export default (arr) => {
  // 对这副牌进行排序，升序、降序都可以
  arr.sort((a, b) => a - b)
  let min = Number.MAX_SAFE_INTEGER;
  let dist = [];
  let result = true;
  for (let i = 0, len = arr.length, tmp = []; i < len; i++) {
    tmp.push(arr[i]);
    for (let j = i + 1; j < len - 1; j++) {
      if (arr[j] === arr[j]) {
        tmp.push(arr[j])
      } else {
        if (min > tmp.length) {
          min = tmp.length;
        }
        dist.push([].concat(tmp));
        tmp.length = 0;
        i = j;
        break;
      }
    }
  }
  dist.every(item => {
    if (item.length % min !== 0) {
      result = false;
      return false;
    }
  })
  return result;
}