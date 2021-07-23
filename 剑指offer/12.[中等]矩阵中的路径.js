/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  if (!board.length) {
    return false;
  }
  const pathStack = [];
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
      const current = board[rowIndex][colIndex];
      // 确定起始位
      if (current === word[pathStack.length]) {
        pathStack.push([rowIndex, colIndex]);
        if (pathStack.length === word.length) {
          return true;
        }
        // 以起始位查找路径
        if (getTargetPath(board, pathStack, word)) {
          return true;
        } else {
          pathStack.length = 0;
        }
      }
    }
  }
  return false;
};

// 以当前位置向上下左右查找目标元素，返回当前路径是否能找到一条有效的链
function getTargetPath(board, pathStack, word) {
  const targetWord = word[pathStack.length];
  const currentPos = pathStack[pathStack.length - 1];
  const aroundEl = {
    t: {
      el: board[currentPos[0] - 1] && board[currentPos[0] - 1][currentPos[1]],
      index: [currentPos[0] - 1, currentPos[1]],
    },
    r: {
      el: board[currentPos[0]][currentPos[1] + 1],
      index: [currentPos[0], currentPos[1] + 1],
    },
    b: {
      el: board[currentPos[0] + 1] && board[currentPos[0] + 1][currentPos[1]],
      index: [currentPos[0] + 1, currentPos[1]],
    },
    l: {
      el: board[currentPos[0]][currentPos[1] - 1],
      index: [currentPos[0], currentPos[1] - 1],
    },
  };
  for (let key in aroundEl) {
    const current = aroundEl[key];
    if (
      current.el === targetWord &&
      !pathStack
        .map((item) => item.toString())
        .includes(current.index.toString())
    ) {
      // 如果相邻元素等于目标元素，且该相邻位置没有出现在已记录的路径中，就将该位置临时 push 到路径栈中
      pathStack.push(current.index);
      // 如果最新的路径栈的长度等于目标单词的长度，那就说明找到了一条有效路径，向上返回 true
      if (pathStack.length === word.length) {
        return true;
      } 
      // 否则说明当前元素不是路径中的最后一个元素，继续查找下一个元素
      else {
        const result = getTargetPath(board, pathStack, word);
        // 如果继续查找到了有效路径，向上层传递 true
        if (result) {
          return true;
        } 
        // 如果以该元素为起点，后续没有找到有效路径，将该元素从路径中移除，继续匹配该元素的父级元素的其他相邻元素
        else {
          pathStack.pop();
          continue;
        }
      }
    }
  }
  // 目标元素周围没有存在于 word 中的字符，存在于该元素的路径不通，返回 false
  return false;
}

// let board = [
//     ["A", "B", "C", "E"],
//     ["S", "F", "E", "S"],
//     ["A", "D", "E", "E"],
//   ],
//   word = "ABCEFSADEESE";

let board = [["a", "a"]],
  word = "aaa";

const result = exist(board, word);
console.log("result: ", result);
