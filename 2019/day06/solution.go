package main

import (
	"bufio"
	"log"
	"os"
	"strings"
)

func main() {
	//file, _ := os.Open("demo") // demo answer is 42
	file, _ := os.Open("input") // demo answer is 42
	defer file.Close()

	scanner := bufio.NewScanner(file)
	orbits := make(map[string]string)
	for scanner.Scan() {
		orbitPieces := strings.Split(scanner.Text(), ")")

		// orbiter is the one that dirctly orbits around a base
		base := orbitPieces[0]
		orbiter := orbitPieces[1]
		orbits[orbiter] = base
	}

	overallOrbitCount := 0
	for _, base := range orbits {
		orbitCount := 1
		indirect := orbits[base]
		for indirect != "" {
			orbitCount++
			indirect = orbits[indirect]
		}
		overallOrbitCount += orbitCount
	}
	log.Printf("part1 orbit count is %d", overallOrbitCount)

	/**
	throw the lhs and rhs pairs into a map, keyed by rhs
	start at the beginning and work backwards
	 */
}

