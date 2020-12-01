from day01 import solve_part_2
from src.day01 import solve_part_1


def test_solve_part_1():
    parts = solve_part_1([1721, 979, 366, 299, 675, 1456], 2020)
    assert parts == (1721, 299)
    assert parts[0] * parts[1] == 514579


def test_solve_part_2():
    parts = solve_part_2([1721, 979, 366, 299, 675, 1456], 2020)
    assert parts == (979, 366, 675)
    assert parts[0] * parts[1] * parts[2] == 241861950
