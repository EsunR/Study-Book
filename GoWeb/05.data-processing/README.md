# 1. JSON 的处理

## 1.1 解析 JSON 数据

通常在应用中从前端获取的数据是 JSON 格式的，那么后台接收数据就需要对数据进行相对应的类型转换才可以使用：

### 1.1.1 解析 JSON 字符串到对象中

使用 ` json.Unmarshal([]byte(jsonStr), &struct)` 可以对 json 字符串进行解析：

```go
type Server struct {
    ServerName string
    ServerIP   string
}

type Serverslice struct {
    Servers []Server
}

func main() {
    var s Serverslice
    str := `{"servers":[{"serverName":"Shanghai_VPN","serverIP":"127.0.0.1"},{"serverName":"Beijing_VPN","serverIP":"127.0.0.2"}]}`
    json.Unmarshal([]byte(str), &s)
    fmt.Println(s)
}
```

注意：创建的结构体首字符必须是大写

### 1.1.2 解析到interface

可以将数据解析到 interface{} 的接口体中，但是调用数据需要对数据进行断言（type assertion）才能正常使用。对应的 json 格式的数据，会按照以下规则被解析：

- JSON 值为 Number 类型 —— 断言转为 float64
- JSON 值为 String 类型 —— 断言转为 string
- JSON 值为 Boolean 类型 —— 断言转为 bool

示例：

```go
func ParseInterface() {
	var data map[string]interface{}
	jsonStr := `{
		"name": "hua hua",
		"age": 18,
		"parents": ["Gomez", "Moral"],
		"gay": false
	}`
	json.Unmarshal([]byte(jsonStr), &data)
	// 使用数据必须对数据进行断言
	name := data["name"].(string)
	age := data["age"].(float64)
	parentsFather := data["parents"].([]interface{})[0]
	gay := data["gay"].(bool)
	fmt.Println(name, age, parentsFather, gay)
}
```

### 1.1.3 使用 simplejson转换 JSON

simplejson 可以将 JSON 字符串快速转换成一个可用的对象，通过 Get 方法进行获取，同时通过 `Int()` 或者 `Float()`  等方法对读取的数据进行格式转换。

安装simplejson：

```sh
$ go get github.com/bitly/go-simplejson
```

使用：

```go
func UseSimpleJson() {
	js, _ := NewJson([]byte(`{
		"test": {
			"array": [1, "2", 3],
			"int": 10,
			"float": 5.150,
			"bignum": 9223372036854775807,
			"string": "simplejson",
			"bool": true
		}
	}`))
	arr, _ := js.Get("test").Get("array").Array()
	i, _ := js.Get("test").Get("int").Int64()
	j, _ := js.Get("test").Get("float").Float64()
	fmt.Println(reflect.TypeOf(j))
	ms := js.Get("test").Get("string").MustString()
	fmt.Println(arr, i, j, ms)
}
```

PS：如果数据进行非法转换，则得出的结果为 0

## 1.2 生成 JSON 数据

当后台将数据进行处理后，需要转换为 JSON 格式的数据发送给前端：

### 1.2.1 使用原生方式生成 JSON 数据

JSON 包里面通过 `Marshal` 函数来处理：

```go
func MarshalJson() {
	data := map[string]interface{}{
		"name":    "huahua",
		"age":     18,
		"parents": []string{"Jon", "Leo"},
	}
	b, err := json.Marshal(data)
	if err != nil {
		fmt.Println("json err:", err)
	}
	fmt.Println(string(b)) // {"age":18,"name":"huahua","parents":["Jon","Leo"]}
}
```

以上方法是通过创建一个 Map 类型的变量，然后将其转化为 JSON 字符串，我们也可以将一个结构体对象转化成一个 JSON 字符串：

```go
func MarshalJsonByStruct() {
	type person struct {
		Name    string   `json:"name"`
		Age     int      `json:"age"`
		Parents []string `json:"parents"`
	}

	data := person{
		Name: "huahua",
		Age:  18,
	}
	data.Parents = append(data.Parents, "Jon")
	data.Parents = append(data.Parents, "Leo")

	b, err := json.Marshal(data)
	if err != nil {
		fmt.Println("json err:", err)
	}
	fmt.Println(string(b))
}
```

注意：创建的结构体对象必须是大写字母开头，我们可以在后缀 `josn:"key"` 将生成的 JSON 字符串的对应字段改为小写。

# 2. 模板引擎

这一部分省略，[查看原文章](https://learnku.com/docs/build-web-application-with-golang/074-template-processing/3198)