/**
 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
*/

var repeatedSubstringPattern = function (s) {
  var reg = /^(\w+)\1+$/
  return reg.test(s)
};

console.log(repeatedSubstringPattern('abab'));
console.log(repeatedSubstringPattern('aba'));
console.log(repeatedSubstringPattern('abcabcabcabc'));