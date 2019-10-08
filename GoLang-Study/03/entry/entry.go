package main

import (
	tree "GoLang-Study/03"
	"fmt"
)

type myTreeNode struct {
	node *tree.Node
}

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

func main() {
	var root tree.Node
	root.SetValue(233)
	fmt.Println("create by var:", root)

	root = tree.Node{Value: 3} // 修改存放变量的内存
	root.Left = &tree.Node{}
	root.Right = &tree.Node{5, nil, nil}
	root.Right.Left = new(tree.Node) // new返回的是一个地址
	root.Right.Right = tree.CreateNode(2)
	fmt.Println("create by new:", root.Right.Left)
	fmt.Println("create by factory:", root.Right.Right)

	nodes := []tree.Node{
		{Value: 3},
		{},
		{6, nil, &root},
	}
	fmt.Println("slice node:", nodes)

	fmt.Println("先序遍历:")
	root.Traverse()

	fmt.Println("后序遍历:")
	myRoot := myTreeNode{&root}
	myRoot.postOrder()

}
