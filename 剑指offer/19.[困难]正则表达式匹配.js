/**
 * https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/
 * 请实现一个函数用来匹配包含'. '和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但与"aa.a"和"ab*a"均不匹配。
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  if (!s.length && !p.length) {
    // 匹配完成返回 true
    return true;
  } else if (s.length && !p.length) {
    return false;
  }
  // 匹配未完成，继续向下匹配
  // 注：当 s 为空但 p 不为空时，匹配尚未完成，因为存在如："" 匹配 "a*" 返回 true、"" 匹配 ”a*b“ 返回 false 的情况
  // '*' 匹配
  if (p[1] === "*") {
    // 只有匹配字符当符合 "*" 前的字符，或 "*" 前的字符为 "." 同时有匹配字符时（防止类似 "" 匹配 ".*a" 造成死循环）
    if (s[0] === p[0] || (p[0] === "." && s.length)) {
      // 处理 "*" 匹配的三种走向
      return (
        // 忽略 "*" 匹配
        isMatch(s, p.slice(2)) ||
        // "*" 匹配到一个字符，继续对后面的字符串进行 * 匹配
        isMatch(s.slice(1), p) ||
        // "*" 匹配到一个字符，结束 "*" 匹配
        isMatch(s.slice(1), p.slice(2))
      );
    } else {
      // 跳过 "*" 匹配
      return isMatch(s, p.slice(2));
    }
  }
  // 正常单字符匹配
  else {
    if (s.length && (s[0] === p[0] || p[0] === ".")) {
      return isMatch(s.slice(1), p.slice(1));
    } else {
      return false;
    }
  }
};

const result = isMatch("a", ".*..a*");
console.log("result: ", result);
