# 1. 原生 Mongodb Nodejs 驱动的使用方式

安装：

```sh
cnpm install mongodb --save
```

快速开始：

```js
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var dbName = 'koa'

MongoClient.connect(url, function(err, client){
  const db = client.db(dbName) // 获取数据库对象
  db.collection("user").insertOne({"name": "张三"}, function(err, result){
    client.close()
  })
})
```

快速开始（新版，但是该方式连接数据库使用Promise会有概率产生数据库未连接上就返回结果的可能）：

```js
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var dbName = 'koa'

const client = new MongoClient(url, { useNewUrlParser: true })
client.connect(err => {
  const db = client.db(dbName)
  db.collection("user").insertOne({
    "name": "花花",
    "age": "18"
  }, (err, result) => {
    client.close()
  })
})
```

查询数据：

```js
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var dbName = 'koa'

const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect(err => {
  const db = client.db(dbName)
  var result = db.collection("user").find({})
  result.toArray((err, doc) => {
    console.log(doc);
    client.close()
  })
})
```