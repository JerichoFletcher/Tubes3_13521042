import isNumeric from "./num"

test('num: isNumeric check numeric string should return true', () => {
    expect(isNumeric('12')).toBeTruthy();
    expect(isNumeric('-5')).toBeTruthy();
    expect(isNumeric('7.4')).toBeTruthy();
});

test('num: isNumeric check non-numeric string should return false', () => {
    expect(isNumeric('abc')).toBeFalsy();
    expect(isNumeric(' ')).toBeFalsy();
    expect(isNumeric('')).toBeFalsy();
    expect(isNumeric('-')).toBeFalsy();
});

test('num: isNumeric check non-string should return false', () => {
    expect(isNumeric(5)).toBeFalsy();
    expect(isNumeric(true)).toBeFalsy();
    expect(isNumeric(['1', '2', '3'])).toBeFalsy();
    expect(isNumeric(undefined)).toBeFalsy();
    expect(isNumeric(null)).toBeFalsy();
});
