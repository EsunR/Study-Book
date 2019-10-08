/**
557.
给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

示例 1:

输入: "Let's take LeetCode contest"
输出: "s'teL ekat edoCteeL tsetnoc" 
注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
 */

// export default (str) => {
//   //  对字符串进行分割放入一个数组种
//   let arr = str.split(' ');
//   let result = arr.map((item) => {
//     // 数组有反转的api
//     return item.split('').reverse().join('');
//   })
//   return result.join(' ');
// }

// // 性能优化
// export default (str) => {
//   return str.split(' ').map((item) => {
//     return item.split('').reverse().join('');
//   }).join(' ');
// }

// 使用正则
// export default (str) => {
//   return str.split(/\s/g).map((item) => {
//     return item.split('').reverse().join('');
//   }).join(' ');
// }


// 使用match识别
// match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。匹配多个结果返回的是一个数组
export default (str) => {
  return str.match(/[\w']+/g).map((item) => {
    return item.split('').reverse().join('');
  }).join(' ');
}