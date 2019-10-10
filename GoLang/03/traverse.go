package tree

import "fmt"

// 先序遍历
func (node *Node) Traverse() {
	//if node == nil {
	//	return
	//}
	//node.Print()
	//node.Left.Traverse()
	//node.Right.Traverse()
	node.TraverseFunc(func(node *Node) {
		node.Print()
	})
	fmt.Println()
}

func (node *Node) TraverseFunc(f func(*Node)) {
	if node == nil {
		return
	}
	f(node)
	node.Left.TraverseFunc(f)
	node.Right.TraverseFunc(f)
}
