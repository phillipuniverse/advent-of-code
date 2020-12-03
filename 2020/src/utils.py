from os import path


def parse_to_lines(zero_padded_day: str) -> list[str]:
    with open(path.join(path.dirname(__file__), f"input/day{zero_padded_day}")) as data:
        return data.read().splitlines()
