// async 是让方法变成异步
async function getData() {
  return '这是一个数据'
}

// 如何获取async异步方法中的数据

// var p = getData();
// p.then((data) => {
//   console.log(data);
// })


//await 是等待异步方法执行完成，可以获取异步方法里面的数据，但是必须得用在异步方法星面面

// await的错误用法
// var d = await.getData();
// console.log(d);


// await 的用法
// async function test() {
//   var d = await getData();
//   console.log(d);
// }

// test();


// await 阻塞功能，把异步改为同步
// async function test(){
//   console.log(1);
//   var d = await getData();
//   console.log(d);
//   console.log(3);
// }
// test();

function getName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var userName = '张三';
      resolve(userName);
    }, 2000);
  })
}

function getAge() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var userAge = '18';
      resolve(userAge);
    }, 1000);
  })
}

// var p = getData();

// p.then(function(data){
//   console.log(data);
// })

async function test() {
  var name = await getName();
  console.log(name);
  var age = await getAge();
  console.log(age);
}

test();