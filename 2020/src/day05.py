import re
from builtins import sorted
from functools import reduce

from utils import parse_to_lines


def highest_seat_id(lines: list[str]):
    return max([seat_id(line) for line in lines])


def missing_seat_id(lines: list[str]):
    seat_ids = sorted([seat_id(line) for line in lines])
    for idx, sid in enumerate(seat_ids):
        if idx != 0 and seat_ids[idx-1] != sid - 1:
            return sid - 1

def seat_id(code: str, start: int = 127) -> int:
    row_id = row(code[0:7])
    column_id = column(code[7:])

    return row_id * 8 + column_id


def column(col_code: str, max_col: int = 7) -> int:
    min = 0
    max = max_col
    idx = 0
    while idx < len(col_code) - 1:
        pivot = (max + min) / 2
        if col_code[idx] == 'L':
            max = int(pivot)
        elif col_code[idx] == 'R':
            min = round(pivot)
        idx += 1

    return min if col_code[idx] == 'L' else max


def row(row_code: str, max_row: int = 127) -> int:
    min = 0
    max = max_row
    idx = 0
    while idx < len(row_code) - 1:
        pivot = (max + min) / 2
        if row_code[idx] == 'F':
            max = int(pivot)
        elif row_code[idx] == 'B':
            min = round(pivot)
        idx += 1

    return min if row_code[idx] == 'F' else max


if __name__ == '__main__':
    lines = parse_to_lines('05')

    part1 = highest_seat_id(lines)
    print(f"Highest seat id: {part1}")
    assert part1 == 904

    part2 = missing_seat_id(lines)
    print(f"Missing seat id: {part2}")
