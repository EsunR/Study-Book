# 1. 广度优先算法

![image.png](https://i.loli.net/2019/09/25/vXyrSIlzmE7adZ4.png)

迷宫格式：

```go
6 5
0 1 0 0 0
0 0 0 1 0
0 1 0 1 0
1 1 1 0 0
0 1 0 0 1
0 1 0 0 0
```

算法实现：

```go
package main

import (
	"fmt"
	"os"
)

type point struct {
	i, j int
}

/**
读取迷宫文件
*/
func readMaze(filename string) [][] int {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	var row, col int
	// 读取文件中的第一行数字，并将其赋值给 row col
	_, _ = fmt.Fscanf(file, "%d %d", &row, &col)
	// 创建一个 slice 结构 [[][][][][][]]
	maze := make([][]int, row)
	// 对每一行进行结构化的创建
	for i := range maze {
		maze[i] = make([]int, col)
		for j := range maze[i] {
			// Fscanf 会将换行符读取为0
			//_, _ = fmt.Fscanf(file, "%d", &maze[i][j])
			_, _ = fmt.Fscan(file, &maze[i][j])
		}
	}
	return maze
}

/**
将某个点与方向向量相加，得出目标点
*/
func (p point) add(r point) point {
	return point{p.i + r.i, p.j + r.j}
}

/**
获取某一点在传入的 grid 中的值
*/
func (p point) at(grid [][]int) (int, bool) {
	// 向上越界或者向下越界
	if p.i < 0 || p.i >= len(grid) {
		return 0, false
	}
	// 向左越界或者向右越界
	if p.j < 0 || p.j >= len(grid[p.i]) {
		return 0, false
	}
	return grid[p.i][p.j], true
}

func walk(maze [][]int, start point, end point) [][]int {
	// 创建对应四个方向向量队列，对应依次为上左下右
	var dirs = [4]point{
		{-1, 0},
		{0, -1},
		{1, 0},
		{0, 1},
	}
	// 创建绘制路径的空数组
	steps := make([][]int, len(maze))
	for i := range steps {
		steps[i] = make([]int, len(maze[i]))
	}
	// 队列是将要走的格子，默认向队列中传入一个起点
	Q := [] point{start}
	for len(Q) > 0 {
		cur := Q[0] // 获取队列头
		Q = Q[1:]   // 退出队列头

		if cur == end {
			break
		}

		for _, dir := range dirs {
			// 开始获取当前点四个方向的点
			next := cur.add(dir) // 在当前方向上的点
			// 下一个点必须保证在 Maze 数组中的值是0（不是墙）
			// 同时也得保证在 Steps 数组中也必须是0（这个位置没有走过）
			// 最后还得保证这个点不是起始位置
			val, ok := next.at(maze)
			if !ok || val == 1 {
				continue
			}
			val, ok = next.at(steps)
			if !ok || val != 0 {
				continue
			}
			if next == start {
				continue
			}
			// 获取当前点的值
			curSteps := steps[cur.i][cur.j]
			steps[next.i][next.j] = curSteps + 1
			Q = append(Q, next)
		}
	}
	return steps
}

func printGrid(grid [][]int) {
	for _, row := range grid {
		for _, val := range row {
			fmt.Printf("%3d ", val)
		}
		fmt.Println()
	}
}

func main() {
	maze := readMaze("11/maze.in")
	printGrid(maze)
	fmt.Println("------------------")
	steps := walk(maze, point{0, 0}, point{len(maze) - 1, len(maze[0]) - 1})
	printGrid(steps)
}
```

结果：

```go
  0   1   0   0   0 
  0   0   0   1   0 
  0   1   0   1   0 
  1   1   1   0   0 
  0   1   0   0   1 
  0   1   0   0   0 
------------------
  0   0   4   5   6 
  1   2   3   0   7 
  2   0   4   0   8 
  0   0   0  10   9 
  0   0  12  11   0 
  0   0  13  12  13 
```

