## `key`属性的注意事项
> 在2.20+的版本里，当组件中使用 `v-for` 时，`key` 现在是必须的。

使用 `v-bind` 方法为标签添加一个 `key` 属性来为每个渲染好的标签添加特定标识符
```html
<p v-for="item in list" v-bind:key="item.id">
    <input type="checkbox">
    ID: {{item.id}}
    Name: {{item.name}}
</p>
```
```js
list: [
    {id: 1, name: '李斯'},
    {id: 2, name: '嬴政'},
    {id: 3, name: '赵高'},
    {id: 4, name: '韩非'}
]
```
**好处：** 便于操作，HTML中的DOM操作也不会出现BUG

注意：`v-for` 循环时，`key` 属性只能使用 `number` 或 `string`  
注意：`key` 在使用的时候，必须使用 `v-bind` 属性绑定的形式，指定 `key` 的值  
在组件中，使用 `v-for` 循环的时候，或者在一些特殊情况中，如果 `v-for` 有问题，必须在使用 `v-for` 的同时，指定唯一的字符串/数字类型 `:key` 值