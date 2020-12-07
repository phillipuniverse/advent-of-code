import re
from collections import defaultdict
from typing import Mapping

from utils import parse_to_lines


Ruleset = Mapping[str, list[tuple[int, str]]]


def create_ruleset(parsed_input: list[str]) -> Ruleset:
    rules = dict()
    for line in parsed_input:
        rules.update(parse_line(line))
    return rules


def parse_line(line: str) -> Ruleset:
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


def flattened_children(parent: str, rules: Ruleset) -> list[tuple[int, str]]:
    if not rules[parent]:
        return []
    children = []
    for child in rules[parent]:
        children += [child] + flattened_children(child[1], rules)
    return children


def num_outermost_contained_bag(rules, search_bag: str = 'shiny gold') -> int:
    toplevel_bag_count = 0
    for key, val in rules.items():
        children = flattened_children(key, rules)
        if search_bag in [bagname for count, bagname in children]:
            toplevel_bag_count += 1

    return toplevel_bag_count


def count_contained_bags(parent: str, rules: Ruleset, multiplier: int = 1) -> int:
    if not rules[parent]:
        return 0
    child_bag_sums = 0
    for child in rules[parent]:
        child_bag_sums += multiplier * child[0] + multiplier * count_contained_bags(child[1], rules, child[0])
    return child_bag_sums


if __name__ == '__main__':
    ruleset = create_ruleset(parse_to_lines('07'))
    part1 = num_outermost_contained_bag(ruleset)
    print(f"Part 1: {part1}")
    assert part1 == 246

    part2 = count_contained_bags('shiny gold', ruleset)
    print(f"Part 2: {part2}")
    # assert part2 == 3254
