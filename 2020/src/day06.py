from builtins import sum
from collections import defaultdict
from typing import Callable

from utils import parse_to_lines


def part1_answer_counter(people: list[str]) -> int:
    """
    Count the number of questions to which _anyone_ answered "yes"
    :param people: group data for the people in the group
    :return: number of yes answers
    """
    return len(set("".join(people)))


def part2_answer_counter(people: list[str]) -> int:
    """
    Count the number of questions to which _everyone_ answered "yes"
    :param people: group data for the people in the group
    :return: number of yes answers
    """
    answers = defaultdict(int)
    for person in people:
        for char in person:
            answers[char] += 1

    return sum([1 for key, val in answers.items() if val == len(people)])


def yes_answers_in_groups(records: list[str], group_yes_counter: Callable[[list[str]], int]) -> int:
    return sum([group_yes_counter(record.split()) for record in records])


if __name__ == '__main__':
    parsed_input = parse_to_lines('06', '\n\n')
    part1 = yes_answers_in_groups(parsed_input, part1_answer_counter)
    print(f"Part 1: {part1}")
    assert part1 == 6273

    part2 = yes_answers_in_groups(parsed_input, part2_answer_counter)
    print(f"Part 2: {part2}")
    assert part2 == 3254
