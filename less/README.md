# 0. 说明

Gulp 版本为 `4.0.0`

模板已支持：

- 热更新
- 编译 less
- 编译 sass
- 压缩合并 css
- 压缩合并 JS
- ES6 语法支持
- 压缩图片
  - 深度压缩 png
- 精灵图
- 自动删除文件
- 哈希化js和css名，以及自动修改引入名

食用：

```shell
开发：
gulp server

构建：
gulp build
```

构建流程：

![20190807130214.png](http://img.cdn.esunr.xyz/markdown/20190807130214.png)

# 1. gulp 4.0 新特性

新版本的 `gulp.tast` 只接受两个参数，第一个参数为任务名，而第二个参数为一个回调函数。

同时新增了两个方法：

- `gulp.series()` 同步执行的任务序列
- `gulp.parallel()` 异步执行的任务序列

他们之间可以相互嵌套。

# 2. 精灵图

精灵图文件存放于 `src/images/sprite` 路径下，该路径的图片不会被压缩再输出，而是被 `gulp.spritesmith` 接手处理。

生成的 `sprite.css` 文件将被哈希化后存放于 `dist/images/sprite/` 目录下，并未与 `build.css` 文件合并，需要单独引入。 