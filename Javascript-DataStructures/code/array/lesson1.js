/**
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

示例:
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
*/

export default (str) => {
  // 建立电话号码键盘映射
  let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  // 把输入字符串按单字符分割变成数组，234=>[2,3,4]
  let num = str.split('');
  // 保存键盘映射后的字母内容，如 23=>['abc', 'def']
  let code = [];
  num.forEach(item => {
    if (map[item]) {
      code.push(map[item]);
    }
  });
  let comb = (arr) => {
    // 临时变量用来保存两个组合的结果
    let tmp = [];
    for (let i = 0, il = arr[0].length; i < il; i++) {
      for (let j = 0, jl = arr[1].length; j < jl; j++) {
        tmp.push(`${arr[0][i]}${arr[1][j]}`)
      }
    }
    arr.splice(0, 2, tmp);
    if (arr.length > 1) {
      comb(arr)
    } else {
      return tmp
    }
    return arr[0];
  }
  switch (code.length) {
    case 0:
      return [];
    case 1:
      return code[0].split('');
    default:
      return comb(code);
  }
}