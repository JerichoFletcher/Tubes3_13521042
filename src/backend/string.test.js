import { uwuifyText } from "./string";

test('text: uwuify should return a string', () => {
    const text = 'hello, my name is jericho.';
    const uwxt = uwuifyText(text);
    
    console.log(`Original: ${text}\nUwuified: ${uwxt}`);
    expect(typeof uwxt).toBe('string');
});
