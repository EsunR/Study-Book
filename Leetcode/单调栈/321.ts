function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
  const m = nums1.length,
    n = nums2.length;
  const maxSubsequence = new Array(k).fill(0);
  let start = Math.max(0, k - n),
    end = Math.min(k, m);
  for (let i = start; i <= end; i++) {
    const subsequence1 = getMaxSubsequence(nums1, i);
    const subsequence2 = getMaxSubsequence(nums2, k - i);
    const curMaxSubsequence = merge(subsequence1, subsequence2);
    if (compare(curMaxSubsequence, 0, maxSubsequence, 0) > 0) {
      maxSubsequence.splice(0, k, ...curMaxSubsequence);
    }
  }
  return maxSubsequence;
}

/**
 * 获取目标序列长度为 k 的最大子序列
 * @param nums
 * @param k
 */
function getMaxSubsequence(nums: number[], k: number): number[] {
  const length = nums.length;
  const stack = new Array(k).fill(0);
  let top = -1; // 栈顶指针
  let remain = length - k; // 记录在当前循环中，填满了当前队列后还可以剩多少个元素（可以挥霍的元素数量）
  for (let i = 0; i < length; i++) {
    const num = nums[i];
    // 如果当前元素比栈顶元素要大，且将当前元素与栈顶元素替换后，
    // 后续仍有足够多的元素可以填满当前栈
    while (top >= 0 && stack[top] < num && remain > 0) {
      top--; // 栈顶指针指向前
      remain--; // 可挥霍元素少一个
    }
    if (top < k - 1) {
      stack[++top] = num;
    } else {
      // 堆栈已满，当前元素还没栈顶元素大，略过当前元素
      remain--;
    }
  }
  return stack;
}

/**
 * 合并两个序列，生成一个最大序列
 * @param subsequence1
 * @param subsequence2
 */
function merge(subsequence1: number[], subsequence2: number[]) {
  const x = subsequence1.length,
    y = subsequence2.length;
  // 边界值处理
  if (x === 0) {
    return subsequence2;
  }
  if (y === 0) {
    return subsequence1;
  }
  const mergeLength = x + y;
  const merged = new Array(mergeLength).fill(0);
  let index1 = 0,
    index2 = 0;
  for (let i = 0; i < mergeLength; i++) {
    if (compare(subsequence1, index1, subsequence2, index2) > 0) {
      merged[i] = subsequence1[index1++];
    } else {
      merged[i] = subsequence2[index2++];
    }
  }
  return merged;
}

/**
 * 对比序列 1 与序列 2 中的目标元素那个先插入到合并序列中
 * @param subsequence1
 * @param index1 // 序列 1 目标元素的索引值
 * @param subsequence2
 * @param index2 // 序列 2 目标元素的索引值
 */
function compare(
  subsequence1: number[],
  index1: number,
  subsequence2: number[],
  index2: number
) {
  const x = subsequence1.length,
    y = subsequence2.length;
  while (index1 < x && index2 < y) {
    // 如果当前对比的元素相等，那么就对比下一位元素
    const difference = subsequence1[index1] - subsequence2[index2];
    if (difference !== 0) {
      return difference;
    }
    index1++;
    index2++;
  }
  // 结果大于0，subsequence1 优先插入:  [1,2,5]<-优先插入  [1,2,4]<-后续插入
  // 反之，subsequence2 优先插入
  return x - index1 - (y - index2);
}
