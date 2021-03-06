from day07 import (
    parse_line,
    num_outermost_contained_bag,
    create_ruleset,
    count_contained_bags,
)


def test_line_parse():
    assert parse_line('light red bags contain 1 bright white bag, 2 muted yellow bags.') \
        == {'light red': [(1, 'bright white'), (2, 'muted yellow')]}


def test_sample_part1():
    sample = '''light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.'''.split('\n')
    assert num_outermost_contained_bag(create_ruleset(sample)) == 4


def test_sample_part2():
    sample = '''light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.'''.split('\n')
    assert count_contained_bags('shiny gold', create_ruleset(sample)) == 32


def test_sample2_part2():
    sample = '''shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.'''.split('\n')
    assert count_contained_bags('shiny gold', create_ruleset(sample)) == 126
