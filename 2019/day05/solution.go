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

	log.Printf("part1 solution: %d", runProgram(line, 1))
	log.Printf("part2 solution: %d", runProgram(line, 5))
}

func runProgram(line string, input int) int {
	codes := convertToInts(strings.Split(line, ","))

	// a bit manual for the first instruction, which is an input instruction
	codes[codes[1]] = input
	// skip to after the first 2 codes
	i := 2
	var diagnosticCode int
	for i < len(codes) {
		instruction := convertToInstruction(codes[i])
		i++

		if instruction.expectedNumberOfParameters >= 2 {
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

			if instruction.expectedNumberOfParameters == 2 {
				if instruction.opcode == 5 {
					// jump if non-zero
					if lOperand != 0 {
						i = rOperand
					}
				} else if instruction.opcode == 6 {
					// jump if zero
					if lOperand == 0 {
						i = rOperand
					}
				}
			} else if instruction.expectedNumberOfParameters == 3 {
				whereToStore := codes[i]
				i++

				if instruction.opcode == 1 {
					codes[whereToStore] = lOperand + rOperand
				} else if instruction.opcode == 2 {
					codes[whereToStore] = lOperand * rOperand
				} else if instruction.opcode == 7 {
					if lOperand < rOperand {
						codes[whereToStore] = 1
					} else {
						codes[whereToStore] = 0
					}
				} else if instruction.opcode == 8 {
					if lOperand == rOperand {
						codes[whereToStore] = 1
					} else {
						codes[whereToStore] = 0
					}
				}
			}
		} else if instruction.opcode == 3 {
			// well there are no other input instructions
			log.Panicf("We found an input instruction at position %d but should not have", i)
		} else if instruction.opcode == 4 {
			// output
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

	var expectedNumberOfParameters int
	if opcode == 1 || opcode == 2 || opcode == 7 || opcode == 8 {
		expectedNumberOfParameters = 3
	} else if opcode == 5 || opcode == 6 {
		expectedNumberOfParameters = 2
	} else if opcode == 3 || opcode == 99 {
		expectedNumberOfParameters = 0
	} else if opcode == 4 {
		expectedNumberOfParameters = 1
	}
	return Instruction{
		opcode:     opcode,
		param1Mode: param1Mode,
		param2Mode: param2Mode,
		param3Mode: param3Mode,
		expectedNumberOfParameters: expectedNumberOfParameters,
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
	opcode, param1Mode, param2Mode, param3Mode, expectedNumberOfParameters int
}
