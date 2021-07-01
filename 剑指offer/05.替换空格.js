/**
 * https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 */

/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  let sArr = s.split("");
  let numberOfBlank = 0;
  let originalLength = 0;
  for (let i = 0; i < sArr.length; i++) {
    originalLength++;
    if (sArr[i] === " ") {
      numberOfBlank++;
    }
  }
  let indexOfOrigin = originalLength - 1;
  let indexOfNew = numberOfBlank * 2 + originalLength - 1;
  while (indexOfOrigin !== indexOfNew) {
    if (sArr[indexOfOrigin] !== " ") {
      sArr[indexOfNew] = sArr[indexOfOrigin];
      indexOfNew--;
      indexOfOrigin--;
    } else {
      [sArr[indexOfNew], sArr[--indexOfNew], sArr[--indexOfNew]] = [
        "0",
        "2",
        "%",
      ];
      indexOfNew--;
      indexOfOrigin--;
    }
  }
  return sArr.join("");
};

const result = replaceSpace("s s s");
console.log(result);
