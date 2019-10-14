package _JSON

import (
	"encoding/json"
	"fmt"
)

func MarshalJson() {
	fmt.Println("================MarshalJson=============")
	data := map[string]interface{}{
		"name":    "huahua",
		"age":     18,
		"parents": []string{"Jon", "Leo"},
	}
	b, err := json.Marshal(data)
	if err != nil {
		fmt.Println("json err:", err)
	}
	fmt.Println(string(b))
}

func MarshalJsonByStruct() {
	fmt.Println("==========MarshalJsonByStruct=============")
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
