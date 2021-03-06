from os import path

from utils import parse_to_lines


def solve_part_1(input_numbers: list[int], sum_equality_check: int) -> tuple[int, int]:
    for first in input_numbers:
        for second in input_numbers:
            if first + second == sum_equality_check:
                return first, second


def solve_part_2(input_numbers: list[int], sum_equality_check: int) -> tuple[int, int, int]:
    for first in input_numbers:
        for second in input_numbers:
            for third in input_numbers:
                if first + second + third == sum_equality_check:
                    return first, second, third


if __name__ == '__main__':
    numbers = [int(line) for line in parse_to_lines('01')]
    part1_pieces = solve_part_1(numbers, 2020)
    print(f"Day 1 part1 answer: {part1_pieces[0]}*{part1_pieces[1]} = {part1_pieces[0]*part1_pieces[1]}")

    part2_pieces = solve_part_2(numbers, 2020)
    print(f"Day 1 part2 answer: {part2_pieces[0]}*{part2_pieces[1]}*{part2_pieces[2]} = {part2_pieces[0]*part2_pieces[1]*part2_pieces[2]}")
