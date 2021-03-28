// 需求:封装一个方法，传入一个路径，可以读取相对应的文件
const fs = require('fs');
const path = require('path')

// 初衷：给定文件路径，返回读取到的内容
function getFileByPath(fpath, callback) {
  fs.readFile(fpath, 'utf-8', (err, dataStr) => {
    if (err) return callback(err);
    callback(null, dataStr);
  })
}


getFileByPath(path.join(__dirname, './files/1.txt'), function (err, dataStr) {
  if (err) return console.log(err);
  console.log(dataStr);
});







