/**
你现在是棒球比赛记录员。
给定一个字符串列表，每个字符串可以是以下四种类型之一：
1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。

每一轮的操作都是永久性的，可能会对前一轮和后一轮产生影响。
你需要返回你在所有回合中得分的总和。
*/
var calPoints = function (ops) {
  let result = [];
  let pre1, pre2;
  // 对数组进行遍历，目的是处理得分
  ops.forEach(element => {
    switch (element) {
      case 'C':
        if (result.length) {
          result.pop();
        }
        break;
      case 'D':
        pre1 = result.pop();
        result.push(pre1, pre1 * 2);
        break;
      case '+':
        pre1 = result.pop();
        pre2 = result.pop();
        result.push(pre2, pre1, pre1 + pre2);
        break;
      default:
        result.push(element);
    }
  });
  return result.reduce((total, num) => {
    return total + num;
  })
};
