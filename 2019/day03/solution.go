package main

import (
	"bufio"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.Open("input")
	defer file.Close()
	reader := bufio.NewReader(file)

	firstLineRaw, _ := reader.ReadString('\n')
	firstLineRaw = strings.TrimSuffix(firstLineRaw, "\n")

	secondLineRaw, _ := reader.ReadString('\n')
	secondLineRaw = strings.TrimSuffix(secondLineRaw, "\n")

	//solve(firstLineRaw, secondLineRaw)

	// max == U:7, D:4, L:5, R:8
	solve("R8,U5,L5,D3", "U7,R6,D4,L4")
}

func solve(firstLineRaw string, secondLineRaw string) {
	max := Maxes{}
	firstLine := parseLine(firstLineRaw, &max)
	secondLine := parseLine(secondLineRaw, &max)

	board, start := createBoard(firstLine, secondLine, max)

	plot(firstLine, board, start, "F")
	plot(secondLine, board, start, "S")
}

func plot(line []Instruction, board [][]string, start Point, identifier string) {
	current := Point{start.x, start.y}
	for _, instr := range line {
		for i := 1; i < instr.Length; i++ {
			newX := current.x
			newY := current.y
			if instr.Direction == UP {
				newY--
			} else if instr.Direction == DOWN {
				newY++
			} else if instr.Direction == LEFT {
				newX--
			} else if instr.Direction == RIGHT {
				newX++
			}
			current.x = newX
			current.y = newY

			val := board[current.y][current.x]
			if val == "C" || val == identifier {
				// do nothing, this is myself
			} else if val == "" {
				board[current.y][current.x] = identifier
			} else {
				board[current.y][current.x] = "B"
			}
		}
	}
}

func createBoard(firstLine []Instruction, secondLine []Instruction, max Maxes) ([][]string, Point) {
	width := max.MaxL + max.MaxR + 1
	height := max.MaxU + max.MaxD + 1

	board := make([][]string, height)
	for i := range board {
		board[i] = make([]string, width)
	}
	start := Point{max.MaxL - 1, max.MaxU - 1}
	board[start.y][start.x] = "C"
	return board, start
}

func parseLine(raw string, max *Maxes) []Instruction {
	rawInstructions := strings.Split(raw, ",")
	instructions := make([]Instruction, 0)
	for _, rawInstr := range rawInstructions {
		instruction := parseInstruction(rawInstr, max)
		instructions = append(instructions, instruction)
	}
	return instructions
}

func parseInstruction(raw string, max *Maxes) Instruction {
	rawDirection := raw[0]
	length, _ := strconv.Atoi(raw[1:])
	var direction Direction
	if rawDirection == 'U' {
		direction = UP
		if length > max.MaxU {
			max.MaxU = length
		}
	} else if rawDirection == 'D' {
		direction = DOWN
		if length > max.MaxD {
			max.MaxD = length
		}
	} else if rawDirection == 'L' {
		direction = LEFT
		if length > max.MaxL {
			max.MaxL = length
		}
	} else if rawDirection == 'R' {
		direction = RIGHT
		if length > max.MaxR {
			max.MaxR = length
		}
	}

	return Instruction{
		Direction: direction,
		Length:    length,
	}
}

type Point struct {
	x, y int
}

type Maxes struct {
	MaxU, MaxD, MaxL, MaxR int
}

type Instruction struct {
	Direction Direction
	Length    int
}

type Direction int

const (
	UP    Direction = iota
	DOWN  Direction = iota
	LEFT  Direction = iota
	RIGHT Direction = iota
)
