function maxProfit(prices: number[], fee: number) {
  const n = prices.length;
  let [sell, buy] = [0, -prices[0]];
  for (let i = 1; i < n; i++) {
    [sell, buy] = [
      Math.max(sell, buy + prices[i] - fee),
      Math.max(buy, sell - prices[i]),
    ];
  }
  return sell;
}

const result = maxProfit([1, 3, 2, 8, 4, 9], 2);

console.log(result);

export {};
