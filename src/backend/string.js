export const uwuificationMap = new Map([
    [/l/gi, 'w'],
    [/r/gi, 'w'],
    [/(?<!yo)u/gi, 'uw'],
    [/\?(?!\?)/g, '? UwU'],
    [/!(?!!)/g, '! OwO'],
    [/\.(?!\.)/g, '. :3'],
    [/you/gi, 'u']
]);

/**
 * Uwuifies a text string.
 * @param {string} text The text to uwuify.
 * @returns {string} The uwuified text.
 */
export function uwuifyText(text){
    // Argument type check
    if(typeof text !== 'string')throw new TypeError();

    // Text uwuification
    let result = text;
    for(const [key, val] of uwuificationMap){
        result = result.replace(key, val);
    }

    return result;
}
