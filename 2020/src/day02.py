from dataclasses import dataclass
from os import path

from utils import parse_to_lines


@dataclass(frozen=True)
class PasswordData:
    leftnum: int
    rightnum: int
    letter: str
    password: str

    @classmethod
    def parse(cls, line):
        return cls(int(line[0:line.index('-')]),
                   int(line[line.index('-') + 1:line.index(' ')]),
                   line[line.index(':') - 1],
                   line[line.index(':')+2:])


def num_valid_part_1(lines: list[str]) -> int:
    valid = 0
    for line in lines:
        pd = PasswordData.parse(line)
        occurrences = pd.password.count(pd.letter)
        if pd.leftnum <= occurrences <= pd.rightnum:
            valid += 1

    return valid


def num_valid_part_2(lines: list[str]) -> int:
    valid = 0
    for line in lines:
        pd = PasswordData.parse(line)

        found_first = bool(pd.password[pd.leftnum-1] == pd.letter)
        found_second = bool(pd.password[pd.rightnum-1] == pd.letter)
        if found_first != found_second:
            valid += 1
        else:
            print(f"Invalid password: {pd}")

    return valid


if __name__ == '__main__':
    lines = parse_to_lines('02')
    print(f"Valid passwords part 1: {num_valid_part_1(lines)}")
    print(f"Valid passwords part 2: {num_valid_part_2(lines)}")

