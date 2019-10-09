package queue

import "fmt"

/*
type Queue []int

func (q *Queue) Push(v int) {
	*q = append(*q, v)
}

func main() {
	q := new(Queue)
	q.Push(2)
	fmt.Println(q)
}
*/

// Rewrite

type Queue []interface{}

func (q *Queue) Push(v interface{}) {
	*q = append(*q, v)
}

func main() {
	q := new(Queue)
	q.Push(2.2)
	fmt.Println(*q)
}
