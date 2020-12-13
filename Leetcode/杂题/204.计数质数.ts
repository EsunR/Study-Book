function isPrime(num: number): boolean {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i * i <= num; ++i) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}

const result = isPrime(1);
console.log("result: ", result);
