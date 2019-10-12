package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
)

func readFile() {
	fmt.Println("=====readFile======")
	folder := `c:\`
	files, _ := ioutil.ReadDir(folder)
	for _, file := range files {
		if file.IsDir() {
			continue
		} else {
			fmt.Println(file.Name())
		}
	}
}

func getAbsPath() {
	fmt.Println("=====getAbsPath=====")
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(dir)
}

func getWorkPath() {
	fmt.Println("=====getWorkPath=====")
	path, _ := os.Getwd()
	fmt.Println(path)
}

func walkPath() {
	root, _ := os.Getwd()
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		fmt.Printf("Visited: %s\n", path)
		return nil
	})
	fmt.Printf("filepath.Walk() returned %v\n", err)
}

func GetAppPath() {
	file, _ := exec.LookPath(os.Args[0])
	path, _ := filepath.Abs(file)
	index := strigs.LastIndex(path, string(os.PathSeparator))
	fmt.Println(path[:index])
}

func main() {
	//readFile()
	//getAbsPath()
	//getWorkPath()
	//walkPath()
	GetAppPath()
}
