import re
from collections import defaultdict
from typing import Mapping

from utils import parse_to_lines


def parse_line(line: str) -> Mapping[str, list[tuple[int, str]]]:
    nests = line.split(', ')
    parent_bag, contains = nests[0].split(' bags contain ')
    bag_nesting = defaultdict(list)
    if contains == 'no other bags.':
        bag_nesting[parent_bag] = []
    else:
        children = [contains] + nests[1:]
        for child in children:
            parsed = re.match(r'(\d)+ (.+)? bag', child)
            bag_nesting[parent_bag].append((int(parsed.group(1)), parsed.group(2)))

    return bag_nesting


def num_outermost_contained_bag(lines: list[str], search_bag: str = 'shiny gold') -> int:
    rules = dict()
    for line in lines:
        rules.update(parse_line(line))

    toplevel_bag_count = 0
    for key, val in rules.items():

        def all_children(parent) -> list:
            if not rules[parent]:
                return []
            children = []
            for child in rules[parent]:
                children += [child[1]] + all_children(child[1])
            return children

        children = all_children(key)
        if search_bag in children:
            toplevel_bag_count += 1

    return toplevel_bag_count


if __name__ == '__main__':
    parsed_input = parse_to_lines('07')
    part1 = num_outermost_contained_bag(parsed_input)
    print(f"Part 1: {part1}")
    # assert part1 == 6273
    #
    # part2 = yes_answers_in_groups(parsed_input, part2_answer_counter)
    # print(f"Part 2: {part2}")
    # assert part2 == 3254
