- [1.propTypes属性强校验](#1proptypes%E5%B1%9E%E6%80%A7%E5%BC%BA%E6%A0%A1%E9%AA%8C)
- [2.defatltProps设置属性默认值](#2defatltprops%E8%AE%BE%E7%BD%AE%E5%B1%9E%E6%80%A7%E9%BB%98%E8%AE%A4%E5%80%BC)
- [3.ref获取元素DOM节点(不推荐)](#3ref%E8%8E%B7%E5%8F%96%E5%85%83%E7%B4%A0dom%E8%8A%82%E7%82%B9%E4%B8%8D%E6%8E%A8%E8%8D%90)
- [4.React声明周期函数](#4react%E5%A3%B0%E6%98%8E%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0)
  - [4.1 Mounting](#41-mounting)
  - [4.2 Updation](#42-updation)
  - [4.3 Unmounting](#43-unmounting)
  - [4.4 应用](#44-%E5%BA%94%E7%94%A8)
- [5. 在React中使用axios](#5-%E5%9C%A8react%E4%B8%AD%E4%BD%BF%E7%94%A8axios)
- [6. React中的过度动画](#6-react%E4%B8%AD%E7%9A%84%E8%BF%87%E5%BA%A6%E5%8A%A8%E7%94%BB)
  - [6.1 CSSTranstion的使用](#61-csstranstion%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [6.2 apear参数](#62-apear%E5%8F%82%E6%95%B0)
  - [6.3 TransitionGroup](#63-transitiongroup)

## 1.propTypes属性强校验
为避免在父组件向子组件传值的过程中传入意外值，如将`propTyopes`设置为止接收字符串，则父级不能向子级传递方法。

```javascript
import PropTypes from 'prop-types'; // 引入
... ...
class TodoItem extends Component{...}
... ...
TodoItem.protoTypes = {
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 可以设置两种类型
  deleteItem: PropTypes.func,
  index: PropTypes.number,
  test: PropTypes.string.isRequired, // 必须要求传递test参数
}
```

## 2.defatltProps设置属性默认值
如果父组件没有向子组件传递某个值，但是在子组件中调用了这个值，可以用`defaultProps`来设置默认值。

```javascript
TodoItem.defaultProps={
  test: 'Hello world'
}
```

## 3.ref获取元素DOM节点(不推荐)
使用`ref`将当前的`input`节点绑定到`this.input`对象上
```javascript
<input
  ref={(input) => {this.input = input}}
></input>
```
在函数方法中可调用`this.input`来获取这个节点的相关属性、方法
```javascript
var value = this.input.props.value;
```
> ref方式去操作DOM可能会因为`setState`方法的异步导致数据错误。`setState`方法提供第二个参数，这个参数是一个函数，在执行完异步之后执行，可以将ref操作放到这里执行

## 4.React声明周期函数
生命周期函数指在某一个时刻被自动调用执行的函数
![a71efaafly1g177dll2lzj21830ncqbt.jpg](http://img.cdn.esunr.xyz/markdown/a71efaafly1g177dll2lzj21830ncqbt.jpg)

### 4.1 Mounting
`componentWillMount` 在组件即将被挂载之前执行，只会执行一次

`componentDidMount` 在组件被加载后执行，只会执行一次，在此可以调用AJAX请求

### 4.2 Updation
`componentWillReceiveProps` 当一个组件从父组件接收了参数，只要父组件的render函数被执行了，该函数就会被执行（第一次出现在父组件中不会被执行，如果这个组件之前已经存在于父组件中，才会执行）

`shouldComponentUpdate` 在组件即将被更新前执行，如果返回false，就会阻止数据更新

`componentWillUpdate` 组件被更新之前会被执行，但是在shouldComponentUpdate之后执行，如果shouldComponeUpdate返回true才会被执行   

`componentDidUpdate` 组件更新后会被执行

### 4.3 Unmounting
`componentWillUnmount` 当组件即将被移出前自动执行

### 4.4 应用
> shouldComponentUpdate

`shouldComponentUpdate`可以传入两个参数，一个`nextProps`一个`nextState`，表示父组件改变时，即将顺应改变的子组件的props值和state值。当父组件发生执行render函数时，子组件也会重新render，此时只要使用该生命周期函数，通过判断即将更新的props和state的值，就可以选择子组件重新渲染与否，如：
```javascript
shouldComponentUpdate(nextProps, nextState) {
  if(nextProps.content !== this.props.content) {
    return true;
  }else {
    return false;
  }
}
```

## 5. 在React中使用axios
```javascript
import axios from 'axios'
// ... ...
axios.get().then().catch()
```

## 6. React中的过度动画
安装 `react-transtion-group` 一个React动画专用的动画库
```
yarn add react-transtion-group
```

### 6.1 CSSTranstion的使用
```javascript
import { CSSTranstion } from 'react-transition-group'
... ...
<CSSTransition
  in={this.state.show} // 动画进入时的判断
  timeout={1000}  // 动画执行的时间
  classNames='fade' // 过长动画的css的前缀，如下面的'.fade-enter' 的前缀 'fade-'
  unmountOnExit // 动画执行结束后移除
  onEntered={(el)=>{el.style.color = 'blue'}} // 动画进入后执行的钩子函数
>
  <div>Hello</div>
</CSSTransition>
```

1. 入场动画的挂载的class: 

    `.fade-enter` 入场动画第一个时刻，但是还未入场，此时挂载该CSS
    ```css
    .fade-enter{
      opacity: 0;
    }
    ```

    `.fade-enter-active` 入场动画的第二个时刻，到入场动画执行完成之前的一个时刻，此时挂载该CSS
    ```css
    .fade-enter-active{
      opacity: 1;
      transition: opacity 1s ease-in
    }
    ```

    `.fade-enter-done` 当整个过场动画执行完成之后执行，此时挂载该CSS
    ```css
    .fade-enter-done{
      opacity: 1
    }
    ```

2. 出场动画的挂载的class: 
    `.fade-exit`、`fade-exit-active`、`fade-exit-done` 跟入场动画的作用相似

### 6.2 apear参数
在 `<CSSTransition>` 标签中传入一个 `appear={true}` 就会在元素上添加额外的 `appear` class，这个apper可以让元素在加载入页面的实行就执行相关的进入页面的动画，假如我们设定了一个元素进入的动画，元素在加载进页面的时候是出于显示状态，则进入动画不会被执行，只有让动画消失再出现的时候才会被执行。如果我们想要元素在被加载进页面的时候就执行进入动画，就可以开启 `appear` 参数，同时在css中这么设置：
```css
.fade-enter, .fade-appear{
  opacity: 0;
}
.fade-enter-active .fade-appear-active{
  opacity: 1;
  transition: opacity 1s ease-in
}
```

### 6.3 TransitionGroup
假如我们要循环生成一些列表DOM，就可以用 `TransitionGroup` 来实现多个元素的切换动画效果，只需要在列表外层加一个 `<TransitionGroup>` 标签
```javascript
import { CSSTransition, TransitionGroup } from 'react-transition-group'

... ...

<TransitionGroup>
  {
    this.state.list.map((item, index) => {
      return (
        <CSSTransition
          timeout={1000}
          classNames='fade'
          key={index}
        >
          <div>{item}</div>
        </CSSTransition>
      )
    })
  }
</TransitionGroup>
```




