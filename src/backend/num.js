/**
 * Checks whether a string is numeric, i.e. is a valid number.
 * @param {string} str The string to evaluate.
 * @returns {boolean} Whether the given string is numeric.
 */
export function isNumeric(str){
    if(typeof str !== 'string')return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

/**
 * Chooses a random element from an array.
 * @param {Array} coll The array to choose from.
 * @returns {*} A random element chosen from the given array.
 */
export function randomChoice(coll){
    if(typeof coll !== 'object' || !(coll instanceof Array))throw new TypeError();
    if(coll.length === 0)return undefined;

    return coll[randomInt(0, coll.length)];
}

/**
 * Generates a random integer between min (inclusive) and max (exclusive).
 * @param {number} min Lower bound (inclusive) of the random number.
 * @param {number} max Upper bound (exclusive) of the random number.
 * @returns {number} A random integer between min (inclusive) and max (exclusive).
 */
export function randomInt(min, max){
    if(typeof min !== 'number' || typeof max !== 'number')throw new TypeError();
    const iMin = Math.floor(min);
    const iMax = Math.floor(max);
    return Math.floor(iMin + Math.random() * (iMax - iMin));
}
