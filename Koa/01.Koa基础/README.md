# 1. Hello Koa !

## 1.1 安装Koa

```
cnpm i koa --save
```

## 1.2 路由

如果我们再Express中使用路由，则需要按照如下使用：

```js
app.use(function (req, res) {
  res.send("返回数据")
})
```

但是在Koa中需要使用：

```js
app.use(async (ctx) => {
  ctx.body = "你好Koa 2.x"
})
```

> ctx: context 上下文，是koa中的一个重要概念

## 1.3 完整示例

```js
var koa = require('koa');

var app = new koa();

app.use(async (ctx) => {
  ctx.body = "你好Koa 2.x"
})

app.listen(3000);
```

# 2. Koa异步处理Async、Await和Promise的使用

`async` 是“异步”的简写，而 `await` 可以认为是 `async wait` 的简写。所以应该很好理解 `async` 用于申明一个 function 是异步的，而 `await` 用于等待一个异步方法执行完成们，他们都是ES7的新语法。


## 2.1 async

**async** 是让方法变成异步，它返回的是一个异步对象

```js
async function getData() {
  return '这是一个数据'
}
console.log(getData()); // Promise { '这是一个数据' }
```

如何调取异步方法中的数据呢？

第一种方法：

```js
async function getData() {
  return '这是一个数据'
}
var p = getData();
p.then((data) => {
  console.log(data);
})
```

```
这是一个数据
```

第二种方法就是使用 `await` 方法

## 2.2 await

**await** 是等待异步方法执行完成。

`await` 在等待 `async` 方法执行完毕，其实 `await` 等待的只是一个表达式，这个表达式在官方文档里说的是 `Promise` 对象，但是它也可以接受普通值。

注意： `await` 必须在 `async` 方法中才可以使用因为 `await` 访问本身就会造成程序停止堵塞，所以必须在异步方法中才可以使用。

### 2.2.1 await与async结合的使用方法

错误示例：

```js
async function getData() {
  return '这是一个数据'
}
var d = await.getData();
console.log(d);
```

```
error: await is not defined
```

正确示例：

```js
async function getData() {
  return '这是一个数据'
}
async function test() {
  var d = await getData();
  console.log(d);
}
test();
```

```
这是一个数据
```

### 2.2.2 await的阻塞

`await` 拥有阻塞功能，可以把异步改为同步：

```js
async function getData() {
  return '这是一个数据'
}
async function test(){
  console.log(1);
  var d = await getData();
  console.log(d);
  console.log(3);
}
test();
```

```
1
这是一个数据
3
```

### 2.2.3 使用await与获取Promise对象数据

使用Promise获取异步数据：

```js
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var userName = '张三';
      resolve(userName);
    }, 1000);
  })
}

var p = getData();

p.then(function(data){
  console.log(data);
})
```

```
(等待1s)
张三
```

由于async本身原理就是返回一个Promise对象，所以使用await也可以来获取Promise异步函数返回的数据：

```js
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var userName = '张三';
      resolve(userName);
    }, 1000);
  })
}


async function test() {
  var data = await getData();
  console.log(data);
}

test();
```

asyn 将 test() 方法改为异步方法，在异步方法中使用 await 可以获取到其他异步方法返回的数据，且有阻塞效果。所以在 test() 内部，所有的代码都是同步执行的，这可以使我们更好的管理异步方法。

在以下例子中可以理解这种异步管理的机制，所有操作按照顺序执行：

```js
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

async function test() {
  var name = await getName();
  console.log(name);
  var age = await getAge();
  console.log(age);
}

test();
```

```
(等待2s)
张三
(等待1s)
18
```