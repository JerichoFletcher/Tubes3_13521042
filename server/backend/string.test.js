import { uwuifyText, uwuificationMap } from "./string";

test('text: uwuify should return a string', () => {
    const text = 'hello, my name is jericho. nice to meet you!';
    const uwxt = uwuifyText(text);
    
    expect(typeof uwxt).toBe('string');
});

test('text: test uwuify outputs', () => {
    const text = 'This has been an extremely weird code to work on! Can I have compensation for my mental health degradation?';
    let result = '';
    for(let i = 0; i < uwuificationMap.size; i++){
        result += `level ${i}:\n${uwuifyText(text, i)}\n\n`;
    }
    console.log(result);
});
