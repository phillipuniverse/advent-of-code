from aoc2021.day01 import (
    solve_part_1,
    solve_part_2,
)


def test_sample_part1():
    sample = [199,
              200,
              208,
              210,
              200,
              207,
              240,
              269,
              260,
              263]
    assert solve_part_1(sample) == 7


def test_sample_part2():
    sample = [199,
              200,
              208,
              210,
              200,
              207,
              240,
              269,
              260,
              263]
    assert solve_part_2(sample) == 5

