from day03 import count_trees


def test_sample():
    input = '''..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#'''.split('\n')
    assert count_trees(input, (3, 1)) == 7
