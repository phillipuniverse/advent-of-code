from utils import parse_to_lines


def run_program(instructions: list[str]):
    seen_instructions = set()

    instruction_pointer = 0
    acc = 0
    while instruction_pointer not in seen_instructions:
        seen_instructions.add(instruction_pointer)
        operation, value = instructions[instruction_pointer].split(' ')
        if operation == 'nop':
            instruction_pointer += 1
        elif operation == 'jmp':
            instruction_pointer += int(value)
        elif operation == 'acc':
            acc += int(value)
            instruction_pointer += 1

    return acc


if __name__ == '__main__':
    part1 = run_program(parse_to_lines('08'))
    print(f"Part 1: {part1}")
    # assert part1 == 246
    #
    # part2 = count_contained_bags('shiny gold', ruleset)
    # print(f"Part 2: {part2}")
    # # assert part2 == 3254
