from os import path
from typing import AnyStr


def solve_part_1(numbers: list[AnyStr], sum_equality_check: int) -> tuple[int, int]:
    for first in numbers:
        for second in numbers:
            if int(first) + int(second) == sum_equality_check:
                return int(first), int(second)


if __name__ == '__main__':
    with open(path.join(path.dirname(__file__), 'input/day01-1')) as data:
        parts = solve_part_1(data.readlines(), 2020)
        print(f"Day 1 answer: {parts[0]}*{parts[1]} = {parts[0]*parts[1]}")
