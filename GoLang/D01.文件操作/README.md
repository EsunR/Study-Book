# 1. 文件目录

## 1.1 获取目录中所有文件

> ioutil.ReadDir(dirname)

```go
// 设置文件的打开目录并打开
folder := `c:\` 
files, _ := ioutil.ReadDir(folder)

// 遍历文件并输出
for _, file := range files {
    if file.IsDir() {
        continue
    } else {
        fmt.Println(file.Name())
    }
}
```

## 1.2 获取相对路径

> filepath.Abs(path)

`filepath.Abs(path)`  是用来将相对路径转换为绝对路径的，如：

```go
dir, _ := filepath.Abs("./")
fmt.Println(dir) // D:\Study\Study-Book\GoLang
```

这里要注意 go 对与跟相对路径的理解，`./` 这个相对路径是我们运行 go 文件的路径。比如，在 Goland 中即为我们当前项目的根目录。又比如，我们在 `D:/Go_WorkSpace` 目录下运行 `go ./test/main.go`，那么在 `main.go` 中去读取的相对路径 `./` 所代表的目录就是 `D:/Go_WorkSpace`。

## 1.3 获取某一文件所在的目录

> filepath.Dir()

```go
exeFilePath := os.Args[0] // 获取的是当前编译后的执行文件所在的目录，这个目录是由编译器生成的
fmt.Println(filepath.Dir(exeFilePath))
```

实际上 `filePath.Dir()`  只是将传入的路径按照路径分隔符，将末尾的文件名去掉而已，如果遇到一个错误格式的文件路径，它会返回 `.`，示例如下：

```
"C:/dir/file.txt" =>  "C:/dir"
"abcd"            =>  "."
```

## 1.4 执行目录与工作目录

**执行目录：**

Go 语言属于编译型语言，在每次编译完成后会生成一个 `.exe` 的可执行文件（Windows）提供给系统执行，我们可以用两种方式去获取这个执行文件的目录：

```go
// 方式1
path := filepath.Dir(os.Args[0])
// 方式2
path, err := filepath.Dir(os.Executable())
```

在 GoLand 中，执行目录为 `C:\Users\username\AppData\Local\Temp` 

使用 fresh 启动 go 文件时，执行目录会生成在运行 fresh 指令的位置

**工作目录：**

工作目录即为当前执行 go 指令的目录，等同于 `filePath.Abs("./")`

```go
path, err := os.Getwd()
```

## 1.5 显示所有文件夹、子文件夹、文件、子文件

```go
func walkPath() {
	root := "D:/Study/Study-Book"
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		fmt.Printf("Visited: %s\n", path)
		return nil
	})
	fmt.Printf("filepath.Walk() returned %v\n", err)
}
```

[更多操作](https://blog.csdn.net/wangshubo1989/article/details/77933654)

对于 go 的路径解析问题，可以 [参考这篇文章](https://studygolang.com/articles/12563)

# 2. 目录操作

文件操作的大多数函数都是在 os 包里面，下面列举了几个目录操作的：

- func Mkdir(name string, perm FileMode) error

  创建名称为 name 的目录，权限设置是 perm，例如 0777

- func MkdirAll(path string, perm FileMode) error

  根据 path 创建多级子目录，例如 astaxie/test1/test2。

- func Remove(name string) error

  删除名称为 name 的目录，当目录下有文件或者其他目录时会出错

- func RemoveAll(path string) error

  根据 path 删除多级子目录，如果 path 是单个名称，那么该目录下的子目录全部删除。

下面是演示代码：

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    os.Mkdir("astaxie", 0777)
    os.MkdirAll("astaxie/test1/test2", 0777)
    err := os.Remove("astaxie")
    if err != nil {
        fmt.Println(err)
    }
    os.RemoveAll("astaxie")
}
```

# 3. 文件操作

## 3.1 建立与打开文件

新建文件可以通过如下两个方法

- func Create(name string) (file *File, err Error)

  根据提供的文件名创建新的文件，返回一个文件对象，默认权限是 0666 的文件，返回的文件对象是可读写的。

- func NewFile(fd uintptr, name string) *File

  根据文件描述符创建相应的文件，返回一个文件对象

通过如下两个方法来打开文件：

- func Open(name string) (file *File, err Error)

  该方法打开一个名称为 name 的文件，但是是只读方式，内部实现其实调用了 OpenFile。

- func OpenFile(name string, flag int, perm uint32) (file *File, err Error)

  打开名称为 name 的文件，flag 是打开的方式，只读、读写等，perm 是权限

## 3.2 写文件

写文件函数：

- func (file *File) Write(b []byte) (n int, err Error)

  写入 byte 类型的信息到文件

- func (file *File) WriteAt(b []byte, off int64) (n int, err Error)

  在指定位置开始写入 byte 类型的信息

- func (file *File) WriteString(s string) (ret int, err Error)

  写入 string 信息到文件

写文件的示例代码

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    userFile := "astaxie.txt"
    fout, err := os.Create(userFile)        
    if err != nil {
        fmt.Println(userFile, err)
        return
    }
    defer fout.Close()
    for i := 0; i < 10; i++ {
        fout.WriteString("Just a test!\r\n")
        fout.Write([]byte("Just a test!\r\n"))
    }
}
```

## 3.3 读文件

读文件函数：

- func (file *File) Read(b []byte) (n int, err Error)

  读取数据到 b 中

- func (file *File) ReadAt(b []byte, off int64) (n int, err Error)

  从 off 开始读取数据到 b 中

读文件的示例代码:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    userFile := "asatxie.txt"
    fl, err := os.Open(userFile)        
    if err != nil {
        fmt.Println(userFile, err)
        return
    }
    defer fl.Close()
    buf := make([]byte, 1024)
    for {
        n, _ := fl.Read(buf)
        if 0 == n {
            break
        }
        os.Stdout.Write(buf[:n])
    }
}
```

## 3.4 删除文件

Go 语言里面删除文件和删除文件夹是同一个函数

- func Remove(name string) Error

  调用该函数就可以删除文件名为 name 的文件