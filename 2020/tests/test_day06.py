from day06 import (
    yes_answers_in_groups,
    part1_answer_counter,
    part2_answer_counter,
)


def test_part1_counter():
    assert part1_answer_counter(['abc']) == 3
    assert part1_answer_counter(['a']) == 1
    assert part1_answer_counter(['ab', 'ab']) == 2
    assert part1_answer_counter(['ab', 'ac']) == 3


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

b'''.split('\n')
    assert yes_answers_in_groups(sample, part1_answer_counter) == 11


def test_part2_counter():
    assert part1_answer_counter('abc') == 3
    assert part1_answer_counter('a') == 1
    assert part1_answer_counter('abab') == 2


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

b'''.split('\n')
    assert yes_answers_in_groups(sample, part2_answer_counter) == 6
