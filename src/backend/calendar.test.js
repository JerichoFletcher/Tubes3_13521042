import findTheDay from "./calendar.js";

test('calendar: test 1, find day should return a name of a day', () => {
    let dateTest = "04/05/2023";
    const expected = "Thursday";
    expect(findTheDay(dateTest)).toStrictEqual(expected);
});

test('calendar: test 2, find day should return a name of a day', () => {
    let dateTest = "01/01/2012";
    const expected = "Sunday";
    expect(findTheDay(dateTest)).toStrictEqual(expected);
});
