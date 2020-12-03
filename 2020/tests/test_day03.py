from day03 import (
    count_trees,
    multiply_trees,
)

sample_input = '''..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#'''


def test_sample_part_1():
    assert count_trees(sample_input.split('\n'), (3, 1)) == 7


def test_sample_part_2():
    assert(multiply_trees(sample_input.split('\n'), [(1, 1),
                                                     (3, 1),
                                                     (5, 1),
                                                     (7, 1),
                                                     (1, 2)])) == 336
