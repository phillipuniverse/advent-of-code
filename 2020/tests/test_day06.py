from day06 import (
    num_yes_answers,
    yes_answers_in_groups,
)


def test_num_yes_answers():
    assert num_yes_answers('abc') == 3
    assert num_yes_answers('a') == 1
    assert num_yes_answers('abab') == 2


def test_sample_part_1():
    sample = '''abc

a
b
c

ab
ac

a
a
a
a

b'''.split()
    assert yes_answers_in_groups(sample) == 11


def test_sample_part_2():
    sample = '''abc

a
b
c

ab
ac

a
a
a
a

b'''
