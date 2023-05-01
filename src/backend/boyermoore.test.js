import bmMatch from "./boyermoore.js";

test('Boyermoore: evaluate string matching should return index where pattern first found', () => {
    const mainString = "Ini adalah itu"
    const patternString = "adalah"
    const expected = 4;
    expect(bmMatch(mainString, patternString)).toStrictEqual(expected);
});

test('Boyermoore: evaluate string matching should return index where pattern first found', () => {
    const mainString = "abcdababcdabcdab"
    const patternString = "abcdabcd"
    const expected = 6;
    expect(bmMatch(mainString, patternString)).toStrictEqual(expected);
});

test('Boyermoore: evaluate string matching should return index -1 (not found)', () => {
    const mainString = "abcdababcdabcdab"
    const patternString = "abcdabca"
    const expected = -1;
    expect(bmMatch(mainString, patternString)).toStrictEqual(expected);
});

test('Boyermoore: evaluate string matching should return index -1 (not found)', () => {
    const mainString = "bacbababaabcba"
    const patternString = "ababaca"
    const expected = -1;
    expect(bmMatch(mainString, patternString)).toStrictEqual(expected);
});

test('Boyermoore: evaluate string matching should return index -1 (not found)', () => {
    const mainString = "Ini adalah itu"
    const patternString = "begitu"
    const expected = -1;
    expect(bmMatch(mainString, patternString)).toStrictEqual(expected);
});

test('Boyermoore: evaluate string matching should return index -1 (not found)', () => {
    const mainString = "Ini adalah itu"
    const patternString = "Ini aDaLah iTu"
    const expected = -1;
    expect(bmMatch(mainString, patternString)).toStrictEqual(expected);
});

test('Boyermoore: evaluate string matching should return index -1 (not found)', () => {
    const mainString = "chwatGwiPwiTi"
    const patternString = "chwatGwiPwiTi lalalala"
    const expected = -1;
    expect(bmMatch(mainString, patternString)).toStrictEqual(expected);
});