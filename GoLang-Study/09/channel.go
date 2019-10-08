package main

import (
	"fmt"
	"time"
)

func createWorker(id int) chan<- int {
	c := make(chan int)
	go func() {
		for {
			fmt.Printf("Worker %d received %c\n", id, <-c)
		}
	}()
	return c
}

func chanDemo() {
	var channels [10]chan<- int
	for i := 0; i < 10; i++ {
		channels[i] = createWorker(i)
	}
	for i := 0; i < 10; i++ {
		channels[i] <- i + 'a'
	}
	for i := 0; i < 10; i++ {
		channels[i] <- i + 'A'
	}
}

func worker(id int, c chan int) {
	for n := range c {
		fmt.Printf("Worker %d received %d\n", id, n)
	}
	//for {
	//	fmt.Printf("Worker %d received %d\n", id, <-c)
	//}
}

func bufferedChannel() {
	c := make(chan int, 3)
	go worker(1, c)
	c <- 1
	c <- 2
	c <- 3
	c <- 4
}

func channelClose() {
	c := make(chan int)
	go worker(1, c)
	c <- 1
	c <- 2
	c <- 3
	c <- 4
	close(c)
}

func main() {
	//chanDemo()
	//bufferedChannel()
	channelClose()
	time.Sleep(time.Millisecond)
}
