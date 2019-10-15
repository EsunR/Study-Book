## 声明

本教程改编自 [《Go Web 编程》](https://learnku.com/index.php/docs/build-web-application-with-golang/about-this-book/3151) ，这是一本很不错的 Go Web 教程书，本教程内容对其进行了大量的摘录与精简，并附上个人理解，同时加了相关的演示源码。

## 目录

### [01. Web 原理基础](./01.web-base)

- Go web 服务器原理
- 自定义路由规则

### [02. 表单](./02.form)

- 请求对象
- request.Form 获取表单信息
- 提交表单时的XSS攻击预防
- 表单的验证输入
- 防止多次提交
- 上传文件 (multipart/form-data)

### [03. 数据库](./03.database)

- 数据库驱动
- 利用 mysql 数据库驱动对数据库进行直接操作
- 使用 XORM 对数据进行基础的增删改查操作 

### [04. session 和数据存储](./04.cookie-session)

- cookie 的使用
- 手动实现由服务器内存驱动的 session

### [05. 数据处理](./05.data-processing)

- JSON 的处理
- 模板引擎

### [06. Web 服务](./06.web-serve) 

- Socket TCP & UDP
- Websocket