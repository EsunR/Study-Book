# 1. 基本配置

[官方文档](https://aui.github.io/art-template/zh-cn/docs/)

1.安装：

```
npm install --save art-template
npm install --save koa-art-template
```

2.引入并使用：

```js
const Koa = require('koa');
const render = require('koa-art-template');

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'view'), // 识图的位置
  extname: '.art', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

app.use(async function (ctx) {
  await ctx.render('user');
});

app.listen(8080);
```

# 2. 语法

art\-template 支持标准语法与原始语法。标准语法可以让模板易读写，而原始语法拥有强大的逻辑表达能力。

标准语法支持基本模板语法以及基本 JavaScript 表达式；原始语法支持任意 JavaScript 语句，这和 EJS 一样。

## 2.1 输出

**标准语法**

```
{{value}}
{{data.key}}
{{data\['key'\]}}
{{a ? b : c}}
{{a || b}}
{{a + b}}
```

**原始语法**

```
<%= value %>
<%= data.key %>
<%= data\['key'\] %>
<%= a ? b : c %>
<%= a || b %>
<%= a + b %>
```

模板一级特殊变量可以使用 `$data` 加下标的方式访问：

```
{{$data\['user list'\]}}
```

## 2.2 原文输出

**标准语法**

```
{{@ value }}
```

**原始语法**

```
<%\- value %>
```

> 原文输出语句不会对 `HTML` 内容进行转义处理，可能存在安全风险，请谨慎使用。

## 2.3 条件

**标准语法**

```
{{if value}} ... {{/if}}
{{if v1}} ... {{else if v2}} ... {{/if}}
```

**原始语法**

```
<% if (value) { %> ... <% } %>
<% if (v1) { %> ... <% } else if (v2) { %> ... <% } %>
```

## 2.4 循环

**标准语法**

```
{{each target}}
{{$index}} {{$value}}
{{/each}}
```

**原始语法**

```
<% for(var i = 0; i < target.length; i++){ %>
 <%= i %> <%= target\[i\] %>
<% } %>
```

1.  `target` 支持 `array` 与 `object` 的迭代，其默认值为 `$data`。
2.  `$value` 与 `$index` 可以自定义：`{{each target val key}}`。

## 2.5 变量

**标准语法**

```
{{set temp = data.sub.content}}
```

**原始语法**

```
<% var temp = data.sub.content; %>
```

## 2.6 模板继承

**标准语法**

```
{{extend './layout.art'}}
{{block 'head'}} ... {{/block}}
```

**原始语法**

```
<% extend('./layout.art') %>
<% block('head', function(){ %> ... <% }) %>
```

模板继承允许你构建一个包含你站点共同元素的基本模板“骨架”。范例：

```html
<!--layout.art-->
<!doctype html>
<html>
<head>
 <meta charset\="utf\-8"\>
 <title>{{block 'title'}}My Site{{/block}}</title>

 {{block 'head'}}
 <link rel="stylesheet" href="main.css">
 {{/block}}
</head>
<body>
 {{block 'content'}}{{/block}}
</body>
</html>
```

```html
<!--index.art-->
{{extend './layout.art'}}

{{block 'title'}}{{title}}{{/block}}

{{block 'head'}}
    <link rel="stylesheet" href="custom.css">
{{/block}}

{{block 'content'}}
<p>This is just an awesome page.</p>
{{/block}}
```

渲染 index.art 后，将自动应用布局骨架。

## 2.7 子模板

**标准语法**

```
{{include './header.art'}}
{{include './header.art' data}}
```

**原始语法**

```
<% include('./header.art') %>
<% include('./header.art', data) %>
```

1.  `data` 数默认值为 `$data`；标准语法不支持声明 `object` 与 `array`，只支持引用变量，而原始语法不受限制。
2.  art-template 内建 HTML 压缩器，请避免书写 HTML 非正常闭合的子模板，否则开启压缩后标签可能会被意外优化。

## 2.8 过滤器

**注册过滤器**

```
template.defaults.imports.dateFormat = function(date, format){/*[code..]*/};
template.defaults.imports.timestamp = function(value){return value * 1000};
```

过滤器函数第一个参数接受目标值。

**标准语法**

```
{{date | timestamp | dateFormat 'yyyy\-MM\-dd hh:mm:ss'}}
```

`{{value | filter}}` 过滤器语法类似管道操作符，它的上一个输出作为下一个输入。

**原始语法**

```
<%= $imports.dateFormat($imports.timestamp(date), 'yyyy\-MM\-dd hh:mm:ss') %>
```

> 如果想修改 `{{` `}}` 与 `<%` `%>`，请参考 [解析规则](https://aui.github.io/art-template/zh-cn/docs/rules.html)。