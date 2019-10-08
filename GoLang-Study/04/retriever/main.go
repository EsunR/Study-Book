package main

import (
	"GoLang-Study/04/retriever/fake"
	real2 "GoLang-Study/04/retriever/real"
	"fmt"
	"time"
)

type MyRetriever interface {
	Get(url string) string
}

type MyPoster interface {
	Post(url string, form map[string]string) string
}

func dowload(r MyRetriever) string {
	return r.Get("http://www.esunr.xyz")
}

func post(poster MyPoster) {
	poster.Post("http://www.esunr.xyz", map[string]string{
		"contents": "hahahahahahah you get content!",
	})
}

type RetrieverPoster interface {
	MyRetriever
	MyPoster
}

const url = "http://www.esunr.xyz"

func session(s RetrieverPoster) string {
	s.Post(url, map[string]string{
		"contents": "hahahahahahah you get content!",
	})
	return s.Get(url)
}

func inspect(r MyRetriever) {
	fmt.Println("Inspecting", r)
	fmt.Printf("%T %v\n", r, r)
	switch v := r.(type) {
	case *fake.Retriever:
		fmt.Println("contents:", v.Contents)
	case *real2.Retriever:
		fmt.Println("UserAgent:", v.UserAgent)
	}
	fmt.Println()
}

func main() {
	var r MyRetriever
	r = &fake.Retriever{"This is fake data"}
	inspect(r)

	r = &real2.Retriever{
		UserAgent: "Mozilla/5.0",
		TimeOut:   time.Minute,
	}
	inspect(r)

	// Type assertion
	if realRetriever, ok := r.(*real2.Retriever); ok {
		fmt.Println("Type assertion:", realRetriever.TimeOut)
	} else {
		fmt.Println("not a real retriever")
	}
	fmt.Println()




	retriever := fake.Retriever{"This is fake date"}
	r = &retriever
	fmt.Println("test session:")
	fmt.Println(session(&retriever))

	//fmt.Println(dowload(r))
}
