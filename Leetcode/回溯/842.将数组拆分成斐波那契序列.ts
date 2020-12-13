/**
 * 给定一个数字字符串 S，比如 S = "123456579"，我们可以将它分成斐波那契式的序列 [123, 456, 579]。
 * @param S 
 */
function splitIntoFibonacci(S: string) {
  const list = new Array().fill(0);
  backtrack(list, S, S.length, 0, 0, 0);
  return list;
}

function backtrack(list, S, length, index, sum, prev) {
  // 终止条件
  if (index === length) {
    return list.length >= 3;
  }
  let currLong = 0;
  for (let i = index; i < length; i++) {
    if (i > index && S[index] === "0") {
      break;
    }
    currLong = currLong * 10 + S[i].charCodeAt() - "0".charCodeAt();
    if (currLong > Math.pow(2, 31) - 1) {
      break;
    }
    let curr = currLong;
    if (list.length >= 2) {
      if (curr < sum) {
        continue;
      } else if (curr > sum) {
        break;
      }
    }
    list.push(curr);
    if (backtrack(list, S, length, i + 1, prev + curr, curr)) {
      return true;
    } else {
      list.splice(list.length - 1, 1);
    }
  }
  return false;
}
