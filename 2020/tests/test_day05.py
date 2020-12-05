from day05 import (
    row,
    column,
    seat_id,
)


def test_row_calc():
    assert row('FBFBBFF') == 44


def test_col_calc():
    assert column('RLR') == 5


def test_sample_seat_ids():
    # assert seat_id('FBFBBFFRLR') == 357
    assert seat_id('BFFFBBFRRR') == 567
    assert seat_id('FFFBBBFRRR') == 119
    assert seat_id('BBFFBBFRLL') == 820


def test_targetd_seat_ids():
    assert seat_id('FFBFBFBRRL') == 123
