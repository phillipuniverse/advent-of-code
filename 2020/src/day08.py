from utils import parse_to_lines


def run_program(instructions: list[str]) -> tuple[int, bool]:
    seen_instructions = set()

    instruction_pointer = 0
    acc = 0
    exited_early = False
    while not exited_early and instruction_pointer != len(instructions):
        seen_instructions.add(instruction_pointer)
        operation, value = instructions[instruction_pointer].split(' ')
        if operation == 'nop':
            instruction_pointer += 1
        elif operation == 'jmp':
            instruction_pointer += int(value)
        elif operation == 'acc':
            acc += int(value)
            instruction_pointer += 1

        if instruction_pointer in seen_instructions or instruction_pointer > len(instructions) or instruction_pointer < 0: # protect jumping way too far
            exited_early = True

    return acc, exited_early


def part2(instructions: list[str]) -> int:
    for idx, instr in enumerate(instructions):
        prev = instr
        if instr.startswith('nop'):
            instructions[idx] = instr.replace('nop', 'jmp')
        elif instr.startswith('jmp'):
            instructions[idx] = instr.replace('jmp', 'nop')

        acc, exited_early = run_program(instructions)
        if not exited_early:
            return acc
        else:
            instructions[idx] = prev


if __name__ == '__main__':
    lines = parse_to_lines('08')
    part1, _ = run_program(lines)
    print(f"Part 1: {part1}")
    assert part1 == 1915

    part2 = part2(lines)
    print(f"Part 2: {part2}")
    assert part2 == 944
