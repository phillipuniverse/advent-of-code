from builtins import sum

from aoc2021.utils import parse_to_lines


def solve_part_1(depths: list[int]) -> int:
    num_increases = 0
    for idx, depth in enumerate(depths[1:], 1):
        if depth > depths[idx-1]:
            num_increases += 1

    return num_increases


def solve_part_2(depths: list[int]) -> int:
    num_increases = 0
    window_size = 3
    for idx, depth in enumerate(depths[window_size:], window_size):
        prev_window = (depths[idx-3], depths[idx-2], depths[idx-1])
        curr_window = (depths[idx-2], depths[idx-1], depth)

        if sum(curr_window) > sum(prev_window):
            num_increases += 1

    return num_increases


if __name__ == '__main__':
    depth_increases = solve_part_1([int(line) for line in parse_to_lines('01')])
    assert depth_increases == 1527
    print(f"Day 1 part1: {depth_increases}")

    window_increases = solve_part_2([int(line) for line in parse_to_lines('01')])
    print(f"Day 1 part2: {window_increases}")
