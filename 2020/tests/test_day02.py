from day02 import (
    num_valid_part_1,
    num_valid_part_2,
)


def test_day02():
    assert num_valid_part_1(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']) == 2


def test_day02_part_2():
    assert num_valid_part_2(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']) == 1
