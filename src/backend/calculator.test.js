/* eslint-disable no-eval */
import evaluate from "./calculator";

test('calculator: evaluate valid expr should return result', () => {
    const exprs = [
        '1',
        '2+3',
        '5+7-9',
        '5-7+9',
        '5*7/12',
        '5/7*12',
        '5-7*12',
        '5*7-12',
        '(12+6)*5',
        '(12)+6*(5)',
        '2^(4*1/2)'
    ];
    for(let i = 0; i < exprs.length; i++){
        const expr = exprs[i];
        const expected = eval(expr.replace(/\^/, '**'));
        const observed = evaluate(expr);
        expect(observed).toStrictEqual(expected);
    }
});

test('calculator: evaluate invalid expr should throw error', () => {
    const exprs = [
        'hello',
        '+',
        '((12)+1',
        '13*5+-2',
        '+3',
        '(1))'
    ];
    for(const expr of exprs)expect(() => evaluate(expr)).toThrow();
});
