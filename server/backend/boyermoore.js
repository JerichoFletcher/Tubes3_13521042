function buildLast(pattern) {
    if(typeof pattern !== 'string')throw new TypeError();

    let last = [];
    for(let i=0; i<128; i++) {
        last[i] = -1;
    }
    for (let i=0; i< pattern.length; i++) {
        last[pattern.charCodeAt(i)] = i;
    }
    return last;
}

function bmMatch(text,pattern){
    let last = buildLast(pattern);
    let textlen = text.length;
    let patternlen = pattern.length;
    let i = patternlen - 1;

    //jika i sudah melebih text
    if (i > textlen-1){
        return -1;
    }

    let j = patternlen-1;
    do {
        //console.log(pattern.charCodeAt(j),text.charCodeAt(i));
        if (pattern.charCodeAt(j) === text.charCodeAt(i)){
            if (j === 0){
                return i;
            } else {
                i--;
                j--;
            }
        } else {
            let lo = last[text.charCodeAt(i)];
            //console.log(`i = ${i}, text[i] = ${text.charCodeAt(i)}, lo = ${lo}`);
            if (j < lo+1) {
                i = i + patternlen - j;
            } else {
                i = i + patternlen - (lo+1);
            }
            //console.log(`i = ${i}`);
            j = patternlen-1;
        } 
    } while (i<=textlen-1);
    return -1;
}

//console.log(bmMatch("stima matkul terdebest se-itb","se-itb"));

module.exports = bmMatch;
