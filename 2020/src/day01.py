from os import path
from typing import AnyStr


def solve_part_1(numbers: list[AnyStr], sum_equality_check: int) -> tuple[int, int]:
    for first in numbers:
        for second in numbers:
            if int(first) + int(second) == sum_equality_check:
                return int(first), int(second)


def solve_part_2(numbers: list[AnyStr], sum_equality_check: int) -> tuple[int, int, int]:
    for first in numbers:
        for second in numbers:
            for third in numbers:
                if int(first) + int(second) + int(third) == sum_equality_check:
                    return int(first), int(second), int(third)


if __name__ == '__main__':
    with open(path.join(path.dirname(__file__), 'input/day01-1')) as data:
        lines = data.readlines()
        part1_pieces = solve_part_1(lines, 2020)
        print(f"Day 1 part1 answer: {part1_pieces[0]}*{part1_pieces[1]} = {part1_pieces[0]*part1_pieces[1]}")

        part2_pieces = solve_part_2(lines, 2020)
        print(f"Day 1 part2 answer: {part2_pieces[0]}*{part2_pieces[1]}*{part2_pieces[2]} = {part2_pieces[0]*part2_pieces[1]*part2_pieces[2]}")
