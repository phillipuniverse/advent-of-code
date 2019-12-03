package main

import (
	"bufio"
	"fmt"
	"math"
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

	// solvePart1("R8,U5,L5,D3", "U7,R6,D4,L4") -- 6
	// solvePart1("R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83") -- 159
	// solvePart1("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7") -- 135

	solvePart1(firstLineRaw, secondLineRaw)
}

func solvePart1(firstLineRaw string, secondLineRaw string) {
	firstLine := parseLine(firstLineRaw)
	secondLine := parseLine(secondLineRaw)

	firstLinePoints := plot(firstLine)
	duplicates := make(map[string]bool)
	for _, p := range firstLinePoints {
		duplicates[toString(p)] = true
	}

	secondLinePoints := plot(secondLine)
	intersection := make([]Point, 0)
	for _, p := range secondLinePoints {
		if duplicates[toString(p)] {
			intersection = append(intersection, p)
		}
	}

	minimumDistance := math.MaxInt64
	for _, p := range intersection {
		distance := int(math.Abs(float64(p.X)) + math.Abs(float64(p.Y)))
		//fmt.Printf("Distance with point %v is %d\n", toString(p), distance)
		if distance < minimumDistance {
			minimumDistance = distance
		}
	}
	fmt.Printf("Minimum intersection distance is %d\n", minimumDistance)
}

func toString(p Point) string {
	return fmt.Sprintf("%d,%d", p.X, p.Y)
}

func plot(line []Instruction) []Point {
	current := Point{0, 0}
	points := make([]Point, 0)
	for _, instr := range line {
		for i := 0; i < instr.Length; i++ {
			newX := current.X
			newY := current.Y
			if instr.Direction == UP {
				newY++
			} else if instr.Direction == DOWN {
				newY--
			} else if instr.Direction == LEFT {
				newX--
			} else if instr.Direction == RIGHT {
				newX++
			}
			current.X = newX
			current.Y = newY
			points = append(points, Point{current.X, current.Y})
		}
	}
	return points
}

func parseLine(raw string) []Instruction {
	rawInstructions := strings.Split(raw, ",")
	instructions := make([]Instruction, 0)
	for _, rawInstr := range rawInstructions {
		instruction := parseInstruction(rawInstr)
		instructions = append(instructions, instruction)
	}
	return instructions
}

func parseInstruction(raw string) Instruction {
	rawDirection := raw[0]
	length, _ := strconv.Atoi(raw[1:])
	var direction Direction
	if rawDirection == 'U' {
		direction = UP
	} else if rawDirection == 'D' {
		direction = DOWN
	} else if rawDirection == 'L' {
		direction = LEFT
	} else if rawDirection == 'R' {
		direction = RIGHT
	}

	return Instruction{
		Direction: direction,
		Length:    length,
	}
}

type Point struct {
	X, Y int
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
