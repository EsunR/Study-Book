## 接口说明

### 接口：/get_banners
> 获取banner  
> [{ID, title, description, href}]

### 接口：/get_custom_evaluations
> 获取用户评论信息
> [{ID, title, description, src}]

## Nodejs端口的设置
1. 引入 `express` 框架和 `mysql` 框架
```js
const express = require('express');
const mysql = require('mysql');
```

2. 设置连接池
```js
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '66812652j',
  database: 'learn'
})
```

3. 使用 `express` 中的 `router` 设置访问接口，并且使用SQL查询返回数据
```js
module.exports = function () {
  var router = express.Router();
  router.get('/get_banners', (req, res) => {
    db.query('SELECT * FROM banner_table', (err,data)=>{
      if(err){
        res.status(500).send('database error').end();
      }else{
        res.send(data).end();
      }
    })
  })
  return router;
}
```











