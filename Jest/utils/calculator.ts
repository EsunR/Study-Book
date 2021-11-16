export function sum(...args: any[]) {
  return args.reduce((acc, cur) => {
    const numberedVal = Number(cur);
    if (isNaN(numberedVal)) {
      throw new Error(`传入的参数 ${cur} 无法转化为合法的 Number 类型`);
    } else {
      acc += numberedVal;
    }
    return acc;
  }, 0);
}
