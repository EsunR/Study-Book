const window = {
  double(x) {
    return x * 2;
  },
  pow(x) {
    return x * x;
  }
};

const pipe = (function() {
  return function(value) {
    let fnStack = [];
    let oproxy = new Proxy(
      {},
      {
        get(pipeObject, fnName) {
          // 只有取 get 属性的时候才执行函数队列
          if (fnName === "get") {
            let result = value;
            for (let fn of fnStack) {
              result = fn(result);
            }
            return result;
          }
          // 如果不是读取 get 属性，就将读取的方法放到函数队列中
          fnStack.push(window[fnName]);
          return oproxy;
        }
      }
    );
    return oproxy;
  };
})();

console.log(pipe(3).double.pow.get);
