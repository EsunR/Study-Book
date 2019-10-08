// 需求:封装一个方法，传入一个路径，可以读取相对应的文件
const fs = require('fs');
const path = require('path')

// 初衷：给定文件路径，返回读取到的内容
function getFileByPath(fpath, succCb, errCb) {
  fs.readFile(fpath, 'utf-8', (err, dataStr) => {
    if (err) return errCb(err);
    succCb(dataStr);
  })
}


// getFileByPath(
//   path.join(__dirname, './files/12.txt'),
//   function (data) {
//     console.log(data);
//   },
//   function (err) {
//     console.log(err);
//   }
// );

// 需求：先读取1.txt，再读取2.txt，最后读取3.txt
// 回调地狱
// 使用ES6中的 Promise 对象来解决回调地狱的问题
// Promise的本质是用来解决会掉地狱的，并不能减少我们的代码量
getFileByPath(path.join(__dirname, './files/1.txt'), function (data) {
  console.log(data);
  getFileByPath(path.join(__dirname, './files/2.txt'), function (data) {
    console.log(data);
    getFileByPath(path.join(__dirname, './files/3.txt'), function (data) {
      console.log(data);
      console.log('finished!');
    })
  })
})







