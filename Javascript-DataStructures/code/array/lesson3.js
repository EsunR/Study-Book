/**
假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。
 */

// function flower(flowerbed, n) {
//   var counter = 0;
//   for (var i = 0; i < flowerbed.length; i++) {
//     if (flowerbed[i] === 0) {
//       var a = flowerbed[i + 1];
//       var b = flowerbed[i + 2];
//       if (i === 0 && (flowerbed[i + 1] === 0 || !(flowerbed[i + 1]))) {
//         flowerbed.splice(i, 1, 1);
//         counter++;
//         continue;
//       }
//       if (i === flowerbed.length - 1 && flowerbed[i - 1] === 0) {
//         flowerbed.splice(i, 1, 1);
//         counter++;
//         continue;
//       }
//       if (a === 0 && b === 0) {
//         counter++;
//         flowerbed.splice(i + 1, 1, 1);
//       }
//     }
//   }
//   console.log(flowerbed);
//   console.log(counter);
//   if (n <= counter) {
//     return true;
//   } else {
//     return false;
//   }
// }

// console.log(flower([0, 0, 1, 0, 1], 1));


export default (arr, n) => {
  let max = 0;
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    if (arr[i] === 0) {
      if (i === 0 && arr[1] === 0) {
        max++;
        i++;
      } else if (arr[i - 1] === 0 && arr[i + 1] === 0) {
        max++;
        i++;
      }
    }
  }
  return max >= n
}