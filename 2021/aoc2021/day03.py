from typing import (
    Tuple,
    Any,
)

from aoc2021.utils import parse_to_lines


def solve_part_1(lines: list[str]) -> Any:
    result = ""
    g = ''
    eps = ''
    for i in range(0, 12):
        bits = []
        for line in lines:
            bits.append(line[i])
        ones = len([b for b in bits if b == '1'])
        zeros = len([b for b in bits if b == '0'])

        if ones > zeros:
            g += '1'
            eps += '0'
        else:
            g += '0'
            eps += '1'

    final_g: int = int(g, 2)
    final_eps: int = int(eps, 2)

    return final_g * final_eps


def solve_part_2(lines: list[str]) -> Any:
    result = ""
    ox_starts_with = ''
    co2_starts_with = ''
    ox_possible = lines
    co2_possible = lines
    ox = ''
    co2 = ''
    for i in range(0, 12):
        ox_bits = []
        co2_bits = []
        for line in ox_possible:
            ox_bits.append(line[i])
        for line in co2_possible:
            co2_bits.append(line[i])
        co2_ones = len([b for b in co2_bits if b == '1'])
        co2_zeros = len([b for b in co2_bits if b == '0'])

        ox_ones = len([b for b in ox_bits if b == '1'])
        ox_zeros = len([b for b in ox_bits if b == '0'])

        if co2_ones > co2_zeros:
            co2_starts_with += '0'
        elif co2_ones == co2_zeros:
            co2_starts_with += '0'
        else:
            co2_starts_with += '1'

        if ox_ones > ox_zeros:
            ox_starts_with += '1'
        elif ox_ones == ox_zeros:
            ox_starts_with += '1'
        else:
            ox_starts_with += '0'

        ox_possible = [p for p in ox_possible if p.startswith(ox_starts_with)]
        co2_possible = [p for p in co2_possible if p.startswith(co2_starts_with)]

        if len(ox_possible) == 1:
            ox = ox_possible[0]
        if len(co2_possible) == 1:
            co2 = co2_possible[0]

    final_co2: int = int(co2, 2)
    final_ox: int = int(ox, 2)

    return final_co2 * final_ox


if __name__ == '__main__':
    p1 = solve_part_1(parse_to_lines('03'))
    print(f"Day 1 part1: {p1}")

    p2 = solve_part_2(parse_to_lines('03'))
    print(f"Day 1 part2: {p2}")
