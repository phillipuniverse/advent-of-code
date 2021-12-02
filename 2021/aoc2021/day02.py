from builtins import sum
from typing import Tuple

from aoc2021.utils import parse_to_lines


def solve_part_1(instructions: list[str]) -> Tuple[int, int]:
    horizontal = 0
    depth = 0
    for instruction in instructions:
        dir, val = instruction.split()
        if dir == "forward":
            horizontal += int(val)
        elif dir == "down":
            depth += int(val)
        elif dir == "up":
            depth -= int(val)
        else:
            raise ValueError("Unknown instruction")

    return horizontal, depth


def solve_part_2(instructions: list[str]) -> Tuple[int, int]:
    horizontal = 0
    aim = 0
    depth = 0
    for instruction in instructions:
        dir, val = instruction.split()
        if dir == "forward":
            horizontal += int(val)
            depth += aim * int(val)
        elif dir == "down":
            aim += int(val)
        elif dir == "up":
            aim -= int(val)
        else:
            raise ValueError("Unknown instruction")

    return horizontal, depth


if __name__ == '__main__':
    horizontal, depth = solve_part_1(parse_to_lines('02'))
    p1 = horizontal * depth
    assert p1 == 1989014
    print(f"Day 1 part1: {p1}")

    horizontal, depth = solve_part_2(parse_to_lines('02'))
    p2 = horizontal * depth
    assert p2 == 2006917119
    print(f"Day 1 part2: {p2}")
