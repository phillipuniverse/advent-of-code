from day08 import run_program


def test_sample_part1():
    sample = '''nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6'''.split('\n')
    assert run_program(sample) == 5
