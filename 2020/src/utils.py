from os import path


def parse_to_lines(zero_padded_day: str, separator: str = '\n') -> list[str]:
    with open(path.join(path.dirname(__file__), f"input/day{zero_padded_day}")) as data:
        return data.read().split(separator)
