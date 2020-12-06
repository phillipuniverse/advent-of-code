from collections import defaultdict

from utils import parse_to_lines


def num_yes_answers(group_data: str) -> int:
    answers = defaultdict(bool)
    for char in group_data:
        answers[char] = True

    return len(answers)


def yes_answers_in_groups(lines: list[str]) -> int:
    unique_answers = 0
    idx = 0
    while idx < len(lines):
        group_data = lines[idx]
        idx += 1
        while idx < len(lines):
            curr = lines[idx]
            if curr == '':
                break
            group_data += curr
            idx += 1

        unique_answers += num_yes_answers(group_data)

    return unique_answers


if __name__ == '__main__':
    parsed_input = parse_to_lines('06')
    part1 = yes_answers_in_groups(parsed_input)
    print(f"Part 1: {part1}")
