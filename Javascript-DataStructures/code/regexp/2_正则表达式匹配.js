/**
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
*/

var isMatch = function (str, mode) {
  // 对模式变量进行正则筛选
  let modeArr = mode.match(/([a-z.]\*)|([a-z]+(?=([a-z.]\*)|$|\.))|\./g);
  console.log('modeArr: ', modeArr);
  let cur = 0;
  let strLen = str.length;
  for (let i = 0; i < modeArr.length; i++) {
    // 对于模式分为三类： .* | a* | cdef | .
    m = modeArr[i].split("");
    if (m[1] === '*') {
      // 如果第二位是*表示是有模式的
      if (m[0] === '.') {
        // 如果是 .* 的情况
        cur = strLen;
        break;
      } else {
        // 如果是 a* 的情况
        while (str[cur] === m[0]) {
          cur++;
        }
      }
    } else if (m[0] === '.') {
      cur++;
    } else {
      // 如果是无模式的
      for (let j = 0; j < m.length; j++) {
        if (str[cur] === m[j]) {
          cur++;
        } else {
          return false;
        }
      }
    }
  }
  return cur === strLen;
};

console.log(isMatch("abc", "a.b"));