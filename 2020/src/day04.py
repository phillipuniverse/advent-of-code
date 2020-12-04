import re

from utils import parse_to_lines


def valid_height(test):
    match = re.search(r'(\d+)(cm|in)', test)
    return match and (
        (match.group(2) == 'cm' and 150 <= int(match.group(1)) <= 193)
        or
        (match.group(2) == 'in' and 59 <= int(match.group(1)) <= 76)
    )


validations = {
    'byr': lambda test: len(test) == 4 and 1920 <= int(test) <= 2002,
    'iyr': lambda test: len(test) == 4 and 2010 <= int(test) <= 2020,
    'eyr': lambda test: len(test) == 4 and 2020 <= int(test) <= 2030,
    'hgt': lambda test: valid_height(test),
    'hcl': lambda test: re.match(r'^#[0-9a-f]{6}$', test),
    'ecl': lambda test: test in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
    'pid': lambda test: re.match(r'^[0-9]{9}$', test),
    'cid': lambda test: True,
}


def valid_passports(lines: list[str], validate: bool = False) -> int:
    idx = 0
    valid = 0
    while idx < len(lines):
        passport_data = lines[idx]
        idx += 1
        while idx < len(lines):
            curr = lines[idx]
            if curr == '':
                break
            passport_data += ' ' + curr
            idx += 1

        passport_parts = passport_data.split(' ')
        search_fields = [
            'byr',
            'iyr',
            'eyr',
            'hgt',
            'hcl',
            'ecl',
            'pid',
            'cid',
        ]
        for part in passport_parts:
            field, val = part.split(':')

            if validate:
                if validations[field](val):
                    search_fields.remove(field)
            else:
                search_fields.remove(field)

        if not search_fields or search_fields == ['cid']:
            valid += 1

        idx += 1

    return valid


if __name__ == '__main__':
    lines = parse_to_lines('04')

    part1 = valid_passports(lines)
    print(f"Number of valid passports part1: {part1}")
    assert part1 == 260

    part2 = valid_passports(lines, True)
    assert part2 == 153
    print(f"Number of valid passports part2: {part2}")
