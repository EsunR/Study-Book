package main

import (
	"fmt"
	"sync"
)

func doWork(id int, w worker) {
	for n := range w.in {
		fmt.Printf("Worker %v received %c\n", id, n)
		w.wg.Done()
	}
}

type worker struct {
	in chan int
	wg *sync.WaitGroup
}

func createWorker(id int, wg *sync.WaitGroup) worker {
	w := worker{
		in: make(chan int),
		wg: wg,
	}
	go doWork(id, w)
	return w
}

func chanDemo() {
	var wg sync.WaitGroup
	wg.Add(20)

	var workers [10]worker
	for i := 0; i < 10; i++ {
		workers[i] = createWorker(i, &wg)
	}
	for i, worker := range workers {
		worker.in <- i + 'a'
	}
	for i, worker := range workers {
		worker.in <- i + 'A'
	}

	wg.Wait()
}

func main() {
	chanDemo()
}
