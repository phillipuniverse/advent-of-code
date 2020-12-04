from utils import parse_to_lines


def valid_passports(lines: list[str]) -> int:
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
            search_fields.remove(part[0:part.index(':')])

        if not search_fields or search_fields == ['cid']:
            valid += 1

        idx += 1

    return valid


if __name__ == '__main__':
    lines = parse_to_lines('04')

    print(f"Number of valid passports part1: {valid_passports(lines)}")
