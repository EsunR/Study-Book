function matrixScore(A: number[][]): number {
  const m = A.length,
    n = A[0].length;
  for (let i = 0; i < m; i++) {
    if (A[i][0] !== 1) {
      for (let j = 0; j < n; j++) {
        A[i][j] === 1 ? (A[i][j] = 0) : (A[i][j] = 1);
      }
    }
  }
  console.log(A);
  for (let j = 0; j < n; j++) {
    let counter_1 = 0;
    let counter_0 = 0;
    for (let i = 0; i < m; i++) {
      if (A[i][j] === 1) {
        counter_1++;
      } else {
        counter_0++;
      }
    }
    if (counter_0 > counter_1) {
      for (let i = 0; i < m; i++) {
        A[i][j] === 1 ? (A[i][j] = 0) : (A[i][j] = 1);
      }
    }
  }

  return A.reduce((prev, current) => {
    return (prev += parseInt(current.join(""), 2));
  }, 0);
}

const res = matrixScore([
  [0, 0, 1, 1],
  [1, 0, 1, 0],
  [1, 1, 0, 0],
]);

console.log(res);
