# 1. 快速开始

## 1.1 安装

安装 vue cli 3 并创建项目：

```sh
npm install -g @vue/cli
vue create vue-unit-test
```

在 cli 创建项目时，选择启用 `Unit Test` ，再选择 `Mocha + Chain`

## 1.2 测试示例

```js
// example.spec.js
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

// 创建测试套件，一个套件组写一个测试套件
describe('HelloWorld.vue', () => { 
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    })
    console.log(wrapper)
    // 断言部分
    expect(wrapper.text()).to.include(msg)
  })
})
```

## 1.3 运行测试

```sh
npm run test:unit
```



