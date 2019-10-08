package main

import (
	"fmt"
	"math/rand"
	"time"
)

func generator() chan int {
	out := make(chan int)
	go func() {
		i := 0
		for {
			// 不断向外部发出信号
			time.Sleep(
				time.Duration(rand.Intn(1500)) * time.Millisecond)
			out <- i
			i++
		}
	}()
	return out
}

func createWorker(id int) chan<- int {
	c := make(chan int)
	go worker(id, c)
	return c
}

func worker(id int, c chan int) {
	for n := range c {
		time.Sleep(1 * time.Second)
		fmt.Printf("Worker %d received %d\n", id, n)
	}
}

func main() {
	var c1, c2 = generator(), generator()
	var worker = createWorker(0)
	var values []int
	tm := time.After(10 * time.Second)
	tick := time.Tick(time.Second)
	for {
		var activeWorker chan<- int
		var activeValue int
		if len(values) > 0 {
			activeWorker = worker
			activeValue = values[0]
		}
		select {
		// 从外部接收 channel 信号
		case n := <-c1:
			values = append(values, n)
		case n := <-c2:
			values = append(values, n)
		//	将接受到的信号发送给 worker
		case activeWorker <- activeValue:
			values = values[1:]
		//	判断相邻的两个请求是否超时
		case <-time.After(800 * time.Millisecond):
			fmt.Println("timeout")
		//	每隔一秒输出队列长度
		case <-tick:
			fmt.Println("quene len =", len(values))
		//	超过 10 秒后终止循环
		case <-tm:
			fmt.Println("bye")
			return
		}
	}
}
