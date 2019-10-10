# 1. 面向对象

- go语言仅支持封装，不支持继承和多台
- go语言没有class只有struct

## 1.1 创建一个树形结构

结构的创建：

```go
type treeNode struct {
	value       int
	left, right *treeNode
}
```

使用treeNode创建一个如下图所示的树形结构：

![image.png](https://i.loli.net/2019/09/10/6gOfm4rVeTC1NG8.png)

```go
func main(){
    root = treeNode{value: 3} // var返回的是一个值
	root.left = &treeNode{}
	root.right = &treeNode{5, nil, nil}
	root.right.left = new(treeNode) // new返回的是一个地址
}
```

可以直接使用slice来创建多个node：

```go
nodes := []treeNode{
    {value: 3},
    {},
    {6, nil, &root},
}
```

使用工厂 函数创建一个叶子：

```go
// 工厂函数
func createNode(value int) *treeNode {
	return &treeNode{value: value} // 返回了一个局部变量的地址，这在Go语言中是允许的
}

func main() {
    root = createNode(3)
    fmt.Println(root) // &{0 <nil> <nil>}
    fmt.Println(*root) // {0 <nil> <nil>}
}
```

## 1.2 遍历树形结构

### 1.2.1 接收者方式调用函数

首先了解一下函数调用者方式去调用函数，我们设置一个方法可以输出当前节点的value：

```go
func (node treeNode) print() {
	fmt.Println(node.value)
}

func main(){
    var root treeNode
    root.print() // 0
}
```

这种方法的调用方式我们称之为接收者方式调用，node指的就是 **接收者** 。其中接收者又分为 **值接收者** 与 **指针接收者**：

- 值接收者将调用方法的对象作为一份拷贝在方法中引用，在函数内对接收者进行的操作 **不会影响调用该方法的对象本身**；
- 指针接收者则是将调用方法的对象的地址引用近函数内，在函数内对接收者进行操作 **会影响调用该方法的对象本身**。

同时，接收者方式调用方法，只是方法执行了另外一种形式，如上述的函数方法，其等价于：

```go
func () print(node treeNode) {
	fmt.Println(node.value)
}

func main(){
    var root treeNode
    print(root) // 0
}
```

接收者方式调用方法的好处是可以更清晰的调用函数，如我们定义一个 `setValue()` 方法：

```go
func (node *treeNode) setValue(value int) {
	node.value = value
}
```

这里要注意的是我们需要使用 **指针接收者** 调用方法，因为我们需要修改调用方法的对象本身。

之后，我们就可以按照如下方式使用，来更改节点的value：

```go
node.setValue(233) 
```

另外，为了方便使用，Go语言会将调用方法的地址对象或者实体对象自动转换为地址或者实体，如：

```go
var node treeNode // 用var方法创建的是一个实体
root.setValue("233") // Go语言会自动将root转化为地址对象
```

> nil指针也可以调用方法

- 要改变内容必须使用指针接收者
- 结构大也考虑使用指针接收者
- 尽量都使用指针接收者

### 1.2.2 先序遍历

```go
func (node *treeNode) traverse() {
	if node == nil {
		return
	}
    // 由于nil也可以调用方法，所以在此无需判断是当前调用者是否是nil
	node.print()
	node.left.traverse()
	node.right.traverse()
}
```

# 2. 封装

封装：

- 函数方法使用驼峰命名
- public 公共变量首字母大写
- privite 私有变量首字母小写

包：

- 一个目录下只能有一个package
- main包包含可执行入口
- 结构定义的方法必须放在同一个包内
- 可以是不同文件

# 3. 包

## 3.1 如何扩充系统类型或者别人的类型

### 3.1.1 使用组合

当我们想要在别人定义的结构体（类型）上创建方法，但是我们会发现在自己的包下无法给非本地的结构体扩展方法：

```go
func (node *tree.Node) postOrder() { // 报错
    // do something here
}
```

那么如果我们想要拓展方法则需要使用组合，定义另一种结构体类型，结构体内部指向原有的类型数据，这样我们就可以通过操作新创建的结构体来访问外部结构体：

```go
type myTreeNode struct {
	node *tree.Node
}
```

之后我们可以创建 `myTreeNode` 类的数据：

```go
var root tree.Node
// ... create a tree here
myRoot := myTreeNode{&root}
```

现在我们可以通过在 `myTreeNode` 数据类型上创建方法来访问到 `tree.Node` 类型了，于是我们在 `myTreeNode` 上创建一个后序遍历的方法：

```go
// 后序遍历
func (myNode *myTreeNode) postOrder() {
	if myNode == nil || myNode.node == nil {
		return
	}
	left := myTreeNode{myNode.node.Left}
	right := myTreeNode{myNode.node.Right}
	left.postOrder()
	right.postOrder()
	myNode.node.Print()
}
```

使用后序遍历：

```go
var root tree.Node
// ... create a tree here
fmt.Println("后序遍历:")
myRoot := myTreeNode{&root}
myRoot.postOrder()
```

### 3.1.2 定义别名

如果我们想要在 slice 上创建一个 push 方法是肯定不被允许的，所以我们可以创建一个结构体以供操作，然而这个结构体本身就是一个 slice，所以我们只是将 slice 重新命名而已，如：

```go
type Queue []int
```

在函数中创建一个 Queue，他本身实际就是一个 slice，可以按照 slice 的方法进行操作：

```go
q := new(Queue) // &[]
```

我们这样就可以在定义的 `Queue` 上创建方法了：

```go
func (q *Queue) Push(v int) {
	*q = append(*q, v)
}
```

使用定义的 `Push` 方法：

```go
q.Push(2)
fmt.Println(q) // &[2]
```

# 4. 获取第三方包

go get 获取第三方包：

```sh
go get golang.org/x/tools/cmd/goimports
```

gopm 下载第三方包：

```sh
## 安装 gopm
go get -v -u github.com/gpmgo/gopm

## 使用 gopm 安装第三方包
gopm get -g -v golang.org/x/tools/cmd/goimports
```

使用 `go install` 指令可以将当前所有的文件安装到 GOPATH 的 bin 目录下

# 5. GOPATH 与 GOROOT

GO 环境中有两个特别重要的环境变量，分别为 GOPATH 与 GOROOT。

GOROOT 是 GO 语言本身核心的存放位置，默认位置为 `C:\Go`，即 GO 的安装目录。

GOPATH 是用户安装的第三方包以及自身项目的所在位置，这个位置相当重要，我们自己编写的项目存放于 GOPATH 的 src 目录下。

# 6. Go Mod

## 6.2 包管理机制

在新版本的 Go 语言包中引入了 Go Mod 包管理机制，可以让 Go 项目不必强制存放于 GOPATH 目录下，当我们将项目交付给他人使用时，也会在项目启动时会自动安装项目依赖。

在启用 Go Mod 前，项目所涉及的依赖需要查找 GOPATH 的目录是否存在依赖包，这样最大的问题就是我们将应用交付与他人时，他人的 GOPATH 中如果没有安装项目使用的依赖，则项目便无法使用。我们可以看到在启用 Go Mod 前一个项目与 GOPATH 是高度关联的：

![image.png](https://i.loli.net/2019/10/09/Tt2gDqXMzh9dxGn.png)

但是在启用 Go Mod 后，我们可以看到 GOPATH 已经消失了，取而代之的是一个 Go Modules，这个 lib 在初始状态是空的。此时我们便不需要关心复制他人的项目时，我们的 GOPATH 中是否有需要依赖的包，因为当我们启动项目时 Go Mod 会帮助我们自动安装所需的依赖包，再自动与当前项目建立关联。如下，如果项目引用到了 `crypto` 模块，那么该模块就会被自动下载，并关联到当前的 Go Modules 中：

![image.png](https://i.loli.net/2019/10/09/5RmBp3NWSdb6MF2.png)

但是开启 Go Mod 后，这些包本质上还是存放于 GOPATH 目录下的，不论是手动使用 `go get` 指令还是 Go Mod 自动安装，所安装的依赖包会被安装至 GOPATH 的 bin 目录下（所以说 GOPATH 还是有用的）。与没有开启 Go Mod 模式的项目不一样的是，bin 目录下的统一个依赖包可能会存在多个版本，因为我们当前电脑上所运行的项目未必用到的都是同一个版本的依赖模块。

## 6.2 启用 Go Mod

初始化 Go Mod：

```shell script
$ go mod init
```

当我们再 GOPATH 以外的路径创建项目时，使用 `go mod init` 会报错，这时候我们要手动定义当前包的名字：

```shell
$ go mod init packageName
```

项目会自动创建一个 `go.mod` 文件，在这个文件中记录了当前模块的名称、go 语言的版本、项目依赖信息：

```
module RWiki-GoServe

go 1.13

require (
	... ...
)
```

之后我们便可以愉快的开发了，使用 `go get` 安装的依赖会自动被记入 `go.mod` 文件中。

