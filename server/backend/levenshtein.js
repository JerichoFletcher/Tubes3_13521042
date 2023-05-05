function levenshtein(string1,string2){
    let len1 = string1.length;
    let len2 = string2.length;
    let matrix = Array.from(Array(len1+1), () => Array(len2+1).fill(0));

    for (let i=1; i<=len1;i++) {
        matrix[i][0] = i;
    }
    for (let j=1;j<=len2;j++){
        matrix[0][j] = j;
    }

    // let debug = '';
    for (let i=1; i <=len1 ; i++) {
        for (let j=1 ; j<=len2 ; j++) {
            const c1 = string1.charAt(i-1);
            const c2 = string2.charAt(j-1);
            // debug += `Comparing ${c1} vs ${c2}`;

            if (c1 === c2) {
                // debug += ', same\n';
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                // debug += ', diff\n';
                matrix[i][j] = Math.min(matrix[i-1][j-1],matrix[i-1][j],matrix[i][j-1])+1;
            }
        }
    }
    // console.log(matrix.toString() + `\n${debug}`);
    return matrix[len1][len2];
}

function getSimilarityPercentage(string1,string2){
    if (typeof string1 !== 'string' || typeof string2 !== 'string') {
        throw new TypeError();
    }
    let difference = levenshtein(string1,string2);
    let percentage = 0;
    let max = Math.max(string1.length,string2.length);
    if (max !== 0){
        percentage = (max-difference)/max;
    } else {
        percentage = 1;
    }
    return percentage;
}

module.exports = getSimilarityPercentage;
