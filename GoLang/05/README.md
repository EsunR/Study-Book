# 1. 函数式编程

## 1.1 使用闭包

使用函数式编程思想，我们可以在一个函数中返回一个函数，构造一个累加器如下：

```go
func adder() func(int) int {
	sum := 0
	return func(v int) int {
		sum += v
		return sum
	}
}
```

使用累加器：

```go
func main() {
	a := adder()
	for i := 0; i < 10; i++ {
		fmt.Println(a(i))
	}
}
```

如上的Go语言函数式编程与Javascript的闭包机制很像，如果上面的累加器使用Javascript写，如下我们能很容易看出相似之处：

```js
function adder() {
  let sum = 0
  return function (i) {
    sum += i;
    return sum
  }
}

let a = adder()

for (let i = 0; i < 10; i++) {
  console.log(a(i))
}
```

## 1.2 正统函数式编程写法

严格的函数式编程需要满足如下条件：

- 不可变性：不能有状态，只有常量和函数
- 函数只能有一个参数

> 由于正统的函数式编程要求严格，代码可读性会较差

```go
type iAdder func(int) (int, iAdder)

func adder2(base int) iAdder {
	return func(v int) (int, iAdder) {
		return base + v, adder2(base + v)
	}
}
```

```go
func main() {
	a2 := adder2(0)
	for i := 0; i < 10; i++ {
		var s int
		s, a2 = a2(i)
		fmt.Println(s)
	}
}
```

## 1.3 使用函数遍历二叉树

常规方式遍历二叉树的方式如下：

```go
// 先序遍历
func (node *Node) Traverse() {
	if node == nil {
		return
	}
	node.Print()
	node.Left.Traverse()
	node.Right.Traverse()
}
```

这个方式有一个很明显的缺点，就是我们在调用 `Traverse()` 方法时，只能按照方法内部编写的方式去操作遍历二叉树，即只能打印出二叉树的每个节点，如果我们想要去增加遍历每个节点时的操作，就需要重新改写 `Traverse()` 方法。

那么如果使用编程式函数的思想，将函数作为一个参数传入方法中，在这个方法中调用该函数，那么我们只需要修改调用方法时传入的函数，就可以拓展功能，所以我们可以将上面的方法改写为：

```go
func (node *Node) TraverseFunc(f func(*Node)) {
	if node == nil {
		return
	}
	f(node)
	node.Left.TraverseFunc(f)
	node.Right.TraverseFunc(f)
}
```

在调用时可以将任意函数传入，`TraverseFunc()`  方法内：

```go
node.TraverseFunc(func(node *Node) {
    // 添加用户自定义的操作，这些操作将会在遍历过程中执行，用户可以对其随意拓展
    node.Print()
})
```

> 这种方式与javascript的callback回调函数思想相似，都是向A函数传入B函数，在A函数的某一固定位置执行B函数。

- go语言的闭包不需要修饰
- 没有Lambda表达式，但是有匿名函数