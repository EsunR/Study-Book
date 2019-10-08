/**
格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。
*/

var grayCode = function (n) {
  var getOrigin = function (n) {
    if (n === 0) {
      return ['0'];
    } else if (n === 1) {
      return ['0', '1'];
    } else {
      let prev = getOrigin(n - 1);
      let result = [];
      let max = Math.pow(2, n) - 1;
      for (let i = 0; i < prev.length; i++) {
        result[i] = `0${prev[i]}`;
        result[max - i] = `1${prev[i]}`;
      }
      return result;
    }
  }
  var result = getOrigin(n);
  result.forEach((element, index) => {
    result.splice(index, 1, parseInt(element, 2))
  });
  return result;
}

console.log(grayCode(1));