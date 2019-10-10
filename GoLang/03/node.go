package tree

import "fmt"

type Node struct {
	Value       int
	Left, Right *Node
}

// 工厂函数
func CreateNode(value int) *Node {
	return &Node{Value: value}
}

// 函数前有一个调用者
func (node Node) Print() {
	fmt.Println(node.Value)
}

func (node *Node) SetValue(value int) {
	node.Value = value
}


