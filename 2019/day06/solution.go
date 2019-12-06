package main

import (
	"bufio"
	"log"
	"os"
	"strings"
)

func main() {
	//file, _ := os.Open("demopart2") // demopart1 answer is 42
	file, _ := os.Open("input") // demopart1 answer is 42
	defer file.Close()

	scanner := bufio.NewScanner(file)
	orbits := make(map[string]string)
	var youBase string
	var santaBase string
	for scanner.Scan() {
		orbitPieces := strings.Split(scanner.Text(), ")")

		// orbiter is the one that dirctly orbits around a base
		base := orbitPieces[0]
		orbiter := orbitPieces[1]
		orbits[orbiter] = base

		if orbiter == "YOU" {
			youBase = base
		}
		if orbiter == "SAN" {
			santaBase = base
		}
	}

	solvePart1(orbits)
	solvePart2(orbits, youBase, santaBase)
}

func solvePart2(orbiterToBase map[string]string, youBase string, santaBase string) {
	youPath := []string{youBase}
	santaPath := []string{santaBase}

	// determine the path to the root from YOU
	youIndirect := orbiterToBase[youBase]
	for youIndirect != "" {
		youPath = append(youPath, youIndirect)
		youIndirect = orbiterToBase[youIndirect]
	}

	// determine the path to the root from SANTA
	santaIndirect := orbiterToBase[santaBase]
	for santaIndirect != "" {
		santaPath = append(santaPath, santaIndirect)
		santaIndirect = orbiterToBase[santaIndirect]
	}

	santaOnlyPath := difference(santaPath, youPath)
	youOnlyPath := difference(youPath, santaPath)

	log.Printf("part2 number of transfers from YOU to SANTA is %d", len(santaOnlyPath) + len(youOnlyPath))
}

// difference returns the elements in `a` that aren't in `b`.
func difference(a, b []string) []string {
	mb := make(map[string]struct{}, len(b))
	for _, x := range b {
		mb[x] = struct{}{}
	}
	var diff []string
	for _, x := range a {
		if _, found := mb[x]; !found {
			diff = append(diff, x)
		}
	}
	return diff
}


func solvePart1(orbiterToBase map[string]string) {
	overallOrbitCount := 0
	for _, base := range orbiterToBase {
		orbitCount := 1
		indirect := orbiterToBase[base]
		for indirect != "" {
			orbitCount++
			indirect = orbiterToBase[indirect]
		}
		overallOrbitCount += orbitCount
	}
	log.Printf("part1 orbit count is %d", overallOrbitCount)

	/**
	throw the lhs and rhs pairs into a map, keyed by rhs
	start at the beginning and work backwards
	*/
}
