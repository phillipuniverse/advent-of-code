package main

import (
	"fmt"
	"strconv"
)

func main() {
	startRaw := "240920"
	endRaw := "789857"

	solvePart1("111111", "111111")
	solvePart1(startRaw, endRaw)

	solvePart2(startRaw, endRaw)
}

func solvePart1(startRaw string, endRaw string) {
	start, _ := strconv.Atoi(startRaw)
	end, _ := strconv.Atoi(endRaw)

	validPwCount := 0
	for i := start; i <= end; i++ {
		if neverDecreases(strconv.Itoa(i)) && hasAtLeastOneSameDigits([]rune(strconv.Itoa(i))) {
			fmt.Printf("Found a valid password: %d\n", i)
			validPwCount++
		}
	}
	fmt.Printf("Number of valid passwords for Part 1: %d\n", validPwCount)
}

func solvePart2(startRaw string, endRaw string) {
	start, _ := strconv.Atoi(startRaw)
	end, _ := strconv.Atoi(endRaw)

	validPwCount := 0
	for i := start; i <= end; i++ {
		if neverDecreases(strconv.Itoa(i)) && has2DigitGroup([]rune(strconv.Itoa(i))) {
			fmt.Printf("Found a valid password: %d\n", i)
			validPwCount++
		}
	}
	fmt.Printf("Number of valid passwords for Part 2: %d\n", validPwCount)
}

func neverDecreases(test string) bool {
	prev, _ := strconv.Atoi(string(test[0]))
	for _, digit := range test[1:] {
		digit, _ := strconv.Atoi(string(digit))
		if digit < prev {
			return false
		}
		prev = digit
	}
	return true
}

func has2DigitGroup(test []rune) bool {
	digits := make(map[rune]uint8)
	for _, digit := range test {
		if _, ok := digits[digit]; ok {
			digits[digit]++
		} else {
			digits[digit] = 1
		}
	}
	for _, v := range digits {
		if v == 2 {
			return true
		}
	}
	return false
}

func hasAtLeastOneSameDigits(test []rune) bool {
	prev := test[0]
	for _, digit := range test[1:] {
		if digit == prev {
			return true
		}
		prev = digit
	}
	return false
}
