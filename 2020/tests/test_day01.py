from src.day01 import solve_part_1


def test_solve():
    parts = solve_part_1(['1721', '979', '366', '299', '675', '1456'], 2020)
    assert parts == (1721, 299)
    assert parts[0] * parts[1] == 514579
