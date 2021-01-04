# 1. Vue3 起步

## 1.1 Vue3 新特性

Vue3 的一些特性：

- 渐进式开发，兼容 Vue2 的特性
- 性能的提升
  - 打包减少 41%
  - 初次渲染快 55%
  - 更新快 133%
  - 内存占用 54%
- Composition API 合集，解决组件开发问题
- 新的 API 的加入
  - Teleport 瞬移组件
  - Suspense 解决异步组件加载问题
- 更好的 Typescript 支持

## 1.2 脚手架工具

使用 vue-cli 创建项目后，vscode 的 prettier 可能与 eslint 存在冲突，需要手动设置。具体表现在使用 ctrl+shift+f 进行格式化时，会采用全局 prettier 规则，而在 ctrl+s 时会采用项目的 eslint 规则，对文件进行格式化。

在全局的 prettier 规则中 `trailingComma` 默认设置为 `es5` 即在多行的数组、对象的每一项的末尾都添加 `,`。然而在项目内的 eslint 读取的 @vue/prettier 插件规则中，该项被设置为 `none`，因此需要手动将规则设置为与全局的规则一致，具体修改方案：

```diff
  // .eslintrc.js
  module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      "plugin:vue/vue3-essential",
      // ... ...
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
+     "prettier/prettier": ["warn", { trailingComma: "es5" }],
    },
  };
```

## 1.2 创建一个 Vue 实例

在 Vue3 中，创建一个实例与 Vue2 有着很大的差别。在 Vue2 中创建实例我们通常使用 new 关键字，来直接创建一个 Vue 实例：

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

然而在 Vue3 中，引入了新的 api `Vue.createApp()` 来创建 Vue 实例：

```html
<div id="counter">
  Counter: {{ counter }}
</div>
```

```js
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')
```

## 1.3 setup

### 1.3.1 ref

在创建 Vue3 组件实例时新增了一个 `setup` 属性，该属性应当传入一个方法，通过该属性，可以简化我们之前需要同时编写 `data` 与 `methods` 属性来执行某些操作。

同时也新增了 `ref` 方法，用来创建引用对象，创建的引用对象必须使用 `refObj.value` 的方式去写入值：

```vue
<template>
  <div>
    <h2>欢迎光临红浪漫洗浴中心</h2>
    <div>请选择一位美女为你服务</div>
  </div>
  <div>
    <button
      v-for="(item, index) in girls"
      v-bind:key="index"
      @click="selectGirlFun(index)"
    >
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ selectGirl }}】为你服务</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const girls = ref(["大脚", "刘英", "晓红"]);
    const selectGirl = ref("");
    
    // selectGirlFun 可以直接在 template 中被绑定调用
    const selectGirlFun = (index: number) => {
      selectGirl.value = girls.value[index];
    };

    return {
      girls,
      selectGirl,
      selectGirlFun,
    };
  },
});
</script>
```

> 从这里可以看出 vue3 与 ReactHook 有一定的相似之处，`ref` 创建值相当于 ReactHook 中使用 `useState` 创建 State 对象；
> 同时在 `setup` 中直接编写的函数方法可以在 template 中直接调用，也与 ReactHook 中写入编写的方法可以直接在 jsx 中调用有相似之处。

### 1.3.2 reactive 

在上面的代码中，每次创建值都需要使用 `ref` 同时写入值时也需要使用 `refObj.value` 来改写，为了避免上面的繁琐操作