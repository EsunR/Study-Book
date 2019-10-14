package _JSON

import (
	"encoding/json"
	"fmt"
	. "github.com/bitly/go-simplejson"
	"reflect"
)

type Server struct {
	ServerName string
	ServerIP   string
}

type Serverslice struct {
	Servers []Server
}

func ParseStruct() {
	fmt.Println("==============ParseStruct==============")
	var s Serverslice
	str := `{
		"servers":[
			{"serverName":"Shanghai_VPN","serverIP":"127.0.0.1"},
			{"serverName":"Beijing_VPN","serverIP":"127.0.0.2"}
		]
	}`
	json.Unmarshal([]byte(str), &s)
	fmt.Println(s)
}

func ParseInterface() {
	fmt.Println("==============ParseInterface==============")
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

func UseSimpleJson() {
	fmt.Println("==============UseSimpleJson==============")
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
