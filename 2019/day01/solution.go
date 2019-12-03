package main

import (
	"bufio"
	"log"
	"os"
	"strconv"
)

func main() {
	file, err := os.Open("input")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	totalFuel := 0
	for scanner.Scan() {
		mass, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("Read a mass %d", mass)
		fuel := Fuel(mass)
		for fuel > 0 {
			totalFuel += fuel
			fuel = Fuel(fuel)
		}
	}
	log.Printf("Total fuel: %d", totalFuel)
}

func Fuel(mass int) int {
	return mass / 3 - 2
}