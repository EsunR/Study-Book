# 1. duck typing

**通常我们设计一个方法时，参数的关注点往往是传入对象的类型，然而在 duck typing 中关注点在于传入对象的行为，能作什么。**

- 像鸭子走路，像鸭子叫，那么就是鸭子
- 描述事物的外部行为而非内部结构
- 严格说go属于结构化类型系统，类似duck typing

duck typing 不是 go 语言独有的概念，而是一种思想，如javascript中的 duck typing 示例如：

```js
Array.prototype.slice.apply(arguments)
```

数组的 slice 方法可以调用者切片，方法的传入对象必须是 Array Like 的数据对象。而函数的 arguments 正式一个 Array Like 数据，所以我们可以将其应用于方法。然而如果我们传入的数据不符合 Array Like 那么就不能使用这个方法。

`Array.prototype.slice` 没有规定传入的参数的数据类型，而是去规定传入的对象有什么特点，字符串、数组都符合规范，所以可以使用这个方法。这就符合 duck typing 的思想概念。

# 2. 接口

## 2.1 接口的定义

> 接口是由使用者来定义的

我们在 package fake 中创建一个结构体，同时结构体上挂载了一个 `Get()` 方法：

```go
// retriever.go
package fake

import "fmt"

type Retriever struct {
	Contents string
}

func (r Retriever) Get(url string) string {
	fmt.Println("url:", url)
	return r.Contents
}
```

之后，在 package main 中我们创建一个 `download` 方法为接口的使用者，这个方法内规定传入一个 MyRetriever  接口，所以说接口是由使用者定义的。使用者需要定义这个 MyRetriever 接口，这个接口有一个 `Get()` 方法

```go
// main.go
package main

import (
	"GoLang-Study/04/fake/retriever"
	"fmt"
)

type MyRetriever interface {
	Get(url string) string
}

func download(r MyRetriever) string {
	return r.Get("www.esunr.xyz")
}
```

于是我们在 main 函数里可以调用这个 `download()` 方法了，前提是传入函数的数据上必须有一个 `Get()` 方法才可以使 `download()` 方法工作：

```go
// main.go
// ... ...
func main() {
	var r MyRetriever 
	r = fake.Retriever{"This is fake data"}
	fmt.Println(dowload(r))
}
```

在这里有一步要注意：

```go
// 如下的调用方法规定了变量是一个 MyRetriever 类型，所以只要符合 MyRetriever 接口要求的数据都可以复制给变量 v
var r MyRetriever 
r = fake.Retriever{"This is fake data"}
// -----------------------------------------
// 这种调用方式虽然可用，但是这样却规定了数据是 fake.Retriever 类型的
r := fake.Retriever{"This is fake data"}
```



我们来梳理一下调用的流程：

- `download()` 方法首先规定了传入内部的数据必须拥有 `MyRetriever`接口中定义的方法。
- 我们在 `main()` 函数中创建了一个变量 `r`， `r` 的结构体（具体是 `mock.Retriever`）上有 `Get` 方法。
- 我们把 `r` 传入 `download()` 方法内部，`download()` 使用 `MyRetriever` 接口的定义检查 `r` 结构体上是否有需要的 `Get` 方法，如果有的话就可以使用，如果没有的话就不能使用。

同时得益于 Go 语言的动态编译，定义的接口可以自动匹配符合接口的结构体，同时也能即时判断我们传入的对象是否有效。

## 2.2 接口实体的实际意义

如果我们想要访问接口实体本身的数据，是无法直接获得的，如：

```go
var r MyRetriever
r = fake.Retriever{"This is fake data"} // 我们称 fake.Retriever{"This is fake data"} 为接口实体
fmt.Println(r.Content) // 报错，因为 r 是一个接口类型，其本身没有 Content 属性
```

我们可以直接输出接口，这时接口输出的值为接口实体本身的值，同时其还拥有一个类型属性，我们可以使用格式化输出的 `%T` 来输出接口类型，`%v` 来输出接口实例本身携带的值：

```go
var r MyRetriever
r = fake.Retriever{"This is fake data"}
fmt.Printf("%T %v\n", r, r) // fake.Retriever {This is fake data}
```

此外我们还可以在 `switch case` 语句中使用 `.(type)` 来获取接口实例实际的类型指针：

```go
var r MyRetriever
r = fake.Retriever{"This is fake data"}
// r.(type) 只能在case中使用，因为其本身就是利用断言返回多个 r 的可能类型
switch v := r.(type) {
    case fake.Retriever:
    	fmt.Println(v.Contents)
}
```

由于在 `switch case` 中访问接口实例过于沙雕，所以我们还可以通过 `接口实例.(接口实例实际的类型指针)` 来访问接口实例本体，这种引用方式被称为 **Type assertion（断言）**：

```go
func main() {
	var r MyRetriever
	r = fake.Retriever{"This is fake data"}
	// Type assertion
	realRetriever := r.(fake.Retriever)
	fmt.Println("Type assertion:", realRetriever.Content)
}
```

由于指针实例可能会不停改变，所以在使用 Type assertion 时，我们通常为其加上一层判断防止报错：

```go
if realRetriever, ok := r.(*real2.Retriever); ok {
    fmt.Println("Type assertion:", realRetriever.TimeOut)
} else {
    fmt.Println("not a real retriever")
}
```

## 2.3 总结

![image.png](https://i.loli.net/2019/09/12/4vwjYCtx7Myd2NQ.png)

接口变量里面有什么？

- 接口变量自带指针
- 接口变量同样采用值传递，几乎不需要使用接口的指针
- 指针接受者实现只能以指针方式使用；值接收者都可

> 此外，`interface{}` 可以表示接收任何类型，因为所有类型都可以满足 `interface{}`

```diff
-   type Queue []int
+	type Queue []interface{}
-   func (q *Queue) Push(v int{}) {
+   func (q *Queue) Push(v interface{}) {
        *q = append(*q, v)
    }

    func main() {
        q := new(Queue)
-       q.Push(2)
+       q.Push(2.2)
        fmt.Println(q)
    }
```

## 2.4 组合接口

创建两个接口之后可以将其放在一个接口是实现一个组合接口：

```go
type MyRetriever interface {
	Get(url string) string
}

type MyPoster interface {
	Post(url string, form map[string]string) string
}

type RetrieverPoster interface {
	MyRetriever
	MyPoster
}

func session(s RetrieverPoster) string {
	s.Post(url, map[string]string{
		"contents": "hahahahahahah you get content!",
	})
	return s.Get(url)
}
```

只有同时满足 MyRetriever 和 MyPoster 接口需求的实体，才能调用 session 方法