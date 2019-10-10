## `v-if` 和 `v-show` 的使用

```html
<div id="app">
    <input type="button" value="toggle" @click="flag = !flag">
    <h3 v-if="flag">this is v-for control element</h3>
    <h3 v-show="flag">this is v-show control element</h3>
</div>
```
```js
data: {
    flag: true,
}
```
效果：  
点击按钮后，可以切换两个H3标签显示与否  
  
区别：  
`v-if` 是把标签从DOM中移出/插入来决定显示与否的（消耗切换性能）。  
`v-show` 是给标签添加 `display: none` 来决定显示与否的（消耗初始渲染性能）。


建议：  
如果涉及到频繁的切换，最好不要使用 `v-if`   
如果元素可能永远也不会被显示出来被用户看到，则推荐使用 `v-if`
