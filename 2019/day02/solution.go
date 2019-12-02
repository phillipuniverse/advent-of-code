package main

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.Open("input")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	reader := bufio.NewReader(file)
	line, _ := reader.ReadString('\n')
	line = strings.TrimSuffix(line, "\n")
	codes := convertToInts(strings.Split(line, ","))

	log.Printf("Read and converted a line: %v", codes)

	i := 0
	for i < len(codes) {
		opcode := codes[i]
		i++
		op1 := codes[codes[i]]
		i++
		op2 := codes[codes[i]]
		i++
		position := codes[i]
		i++

		if opcode == 1 {
			codes[position] = op1 + op2
		} else if opcode == 2 {
			codes[position] = op1 * op2
		} else if opcode == 99 {
			log.Print("Found a 99, stopping the world!")
			break
		}
	}

	log.Printf("Final transformed program: %v", codes)
}

func convertToInts(strings []string) []int {
	var ints []int = make([]int, len(strings))
	for i := range strings {
		var err error
		ints[i], err = strconv.Atoi(strings[i])
		if err != nil {
			log.Fatal(err)
		}
	}
	return ints
}