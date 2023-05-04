import { randomChoice } from "./num.js";

export const uwuificationMap = new Map([
    [0, []],
    [1, [
        str => str.replace(/L/g, 'W'),
        str => str.replace(/l/g, 'w'),
        str => str.replace(/R/g, 'W'),
        str => str.replace(/r/g, 'w'),
        str => str.replace(/Y[Oo][Uu]/g, 'U'),
        str => str.replace(/y[Oo][Uu]/g, 'u')
    ]],
    [2, [
        str => str.replace(/M(?=[AaEeIiOoUu])/g, 'Mw'),
        str => str.replace(/m(?=[AaEeIiOoUu])/g, 'mw'),
        str => str.replace(/m[bdfgpvz](?!w)/gi, (match, _index) => match + 'w'),
        str => str.replace(/(?<!yo)u(?!w)/gi, 'uw'),
        str => str.replace(/\?(?![^\s])/g, '? UwU'),
        str => str.replace(/!(?![^\s])/g, '! OwO'),
        str => (Math.random() < 0.8 ? 'OwO *notices your text* ' : '') + str,
        str => str + (Math.random() < 0.5 ? ' *giggles*' : ''),
        str => str + (Math.random() < 0.33 ? ' *rawr*' : '')
    ]],
    [3, [
        str => {
            const cursed = [
                'xD', ':3', '-.-', '(ーー;)', '☆⌒ヽ(*"､^*)', '(°ロ°)!?',
                '(* ^ ω ^)', '(*^.^*)', 'O.o', '(≧◡≦)', '( ˘⌣˘)♡(˘⌣˘ )', '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', '(o^▽^o)', 
                '〜☆', '*:･ﾟ✧*:･ﾟ✧', '☆*:・ﾟ'
            ];
            return str.replace(/\.(?![^\s])/g, (match, _index) => Math.random() < 0.33 ? randomChoice(cursed) : match);
        },
        str => str.replace(/(?<![0-9a-z])[a-z]/gi, (match, _index) => Math.random() < 0.2 ? `${match}-${match}` : match)
    ]],
]);

/**
 * Uwuifies a text string.
 * @param {string} text The text to uwuify.
 * @param {number} level The level of uwuification to apply.
 * @returns {string} The uwuified text.
 */
export function uwuifyText(text, level = 1){
    // Argument type check
    if(
        typeof text !== 'string'
        || typeof level !== 'number'
        || level < 0
    )throw new TypeError();

    // Text uwuification
    let result = text;
    for(let i = 0; i <= Math.min(uwuificationMap.size - 1, Math.floor(level)); i++){
        const uwuProcessors = uwuificationMap.get(i);
        for(const uwuProcessor of uwuProcessors){
            result = uwuProcessor(result);
        }
    }

    return result;
}
