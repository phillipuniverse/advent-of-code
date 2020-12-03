from collections import namedtuple

from utils import parse_to_lines


def count_trees(map: list[str], slope_increase: (int, int)) -> int:
    """

    :param map: original map given
    :param slope_increase: (x, y) coordinates of how much to increase on the x and y coordinates each iteration
    :return:
    """

    increase_right, increase_down = slope_increase

    x, y = 0, 0
    trees_encountered = 0
    # Assume same length on every line
    max_y = len(map[0]) - 1
    while x < len(map):
        if map[x][y] == '#':
            trees_encountered += 1

        x += increase_down
        y += increase_right
        if y > max_y:
            # if I run out of room on the right, just wrap around
            # extra minus 1 is because the number past the end needs to be zero indexed
            y = y - max_y - 1

    return trees_encountered


if __name__ == '__main__':
    lines = parse_to_lines('03')

    part1_solution = count_trees(lines, (3, 1))
    print(f"Trees encountered part 1: {part1_solution}")
    assert part1_solution == 216
