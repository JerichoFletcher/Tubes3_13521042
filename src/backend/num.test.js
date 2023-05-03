import { isNumeric, randomInt, randomChoice } from "./num"

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

test('num: randomInt should generate a number', () => {
    expect(typeof randomInt(0, 10)).toBe('number');
});

test('num: randomInt should generate a number between the given range', () => {
    const min = 0, max = 10;

    for(let i = 0; i < 100; i++){
        const rand = randomInt(min, max);
        expect(rand).toBeGreaterThanOrEqual(min);
        expect(rand).toBeLessThan(max);
    }
});

test('num: randomChoice should choose an item within the given array', () => {
    const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    for(let i = 0; i < 100; i++){
        const choose = randomChoice(array);
        expect(array.includes(choose)).toBeTruthy();
    }
});
