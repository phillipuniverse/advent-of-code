package main

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
)

//func main() {
//	log.Printf("Instruction: %v", convertToInstruction(1002))
//}

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
	log.Printf("part1 solution: %d", runProgram(codes))

	//codes = convertToInts(strings.Split(line, ","))
	//for noun := 0; noun <= 100; noun++ {
	//	for verb := 0; verb <= 100; verb++ {
	//		codes[1] = noun
	//		codes[2] = verb
	//		if runProgram(codes) == 19690720 {
	//			log.Printf("part2 noun: %d verb: %d", noun, verb)
	//			os.Exit(0)
	//		}
	//		// reset back to the original
	//		codes = convertToInts(strings.Split(line, ","))
	//	}
	//}
}

func runProgram(codes []int) int {
	// a bit manual for the first instruction, which is an input instruction that takes a value 1
	codes[codes[1]] = 1
	// skip to after the first 2 codes
	i := 2
	var diagnosticCode int
	for i < len(codes) {
		instruction := convertToInstruction(codes[i])
		i++

		if instruction.opcode == 1 || instruction.opcode == 2 {
			// multiply or add consuming 2 parameters
			var lOperand int
			if instruction.param1Mode == 0 {
				lOperand = codes[codes[i]]
			} else {
				lOperand = codes[i]
			}
			i++

			var rOperand int
			if instruction.param2Mode == 0 {
				rOperand = codes[codes[i]]
			} else {
				rOperand = codes[i]
			}
			i++

			whereToStore := codes[i]
			i++

			if instruction.opcode == 1 {
				codes[whereToStore] = lOperand + rOperand
			} else {
				codes[whereToStore] = lOperand * rOperand
			}
		} else if instruction.opcode == 3 {
			// well there are no other input instructions
			log.Panicf("We found an input instruction at position %d but should not have", i)
		} else if instruction.opcode == 4 {
			outputLocation := codes[i]
			i++
			diagnosticCode = codes[outputLocation]
			log.Printf("Value at location %d is %d", outputLocation, diagnosticCode)
		} else if instruction.opcode == 99 {
			log.Print("Found a 99, stopping the world!")
			break
		} else {
			log.Panicf("Unknown opcode %d", instruction.opcode)
		}
	}

	return diagnosticCode
}

func convertToInstruction(instruction int) Instruction {
	opcode := instruction % 100
	instruction = instruction / 100
	param1Mode := instruction % 10
	instruction = instruction / 10
	param2Mode := instruction % 10
	instruction = instruction / 10
	param3Mode := instruction % 10
	instruction = instruction / 10
	return Instruction{
		opcode:     opcode,
		param1Mode: param1Mode,
		param2Mode: param2Mode,
		param3Mode: param3Mode,
	}
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

type Instruction struct {
	opcode, param1Mode, param2Mode, param3Mode int
}
