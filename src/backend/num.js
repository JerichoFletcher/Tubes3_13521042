/**
 * Checks whether a string is numeric, i.e. is a valid number.
 * @param {string} str The string to evaluate.
 * @returns {boolean} Whether the given string is numeric.
 */
function isNumeric(str){
    if(typeof str !== 'string')return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export default isNumeric;
