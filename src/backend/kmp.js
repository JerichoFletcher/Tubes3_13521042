

function kmp(mainString, patternString){
    let idxMain = 0;

    while (idxMain <= mainString.length - patternString.length) {
        let idxPattern = 0;
        let countMatch = 0;
        while (idxPattern < patternString.length){

            // console.log("idxMain: " + idxMain + "\nmain: " + mainString[idxMain+idxPattern] + "\npattern: " + patternString[idxPattern])

            if (mainString[idxMain+idxPattern] !== patternString[idxPattern]){
                break;
            } else {
                countMatch++;
                idxPattern++;
            }
        }
        if (idxPattern === patternString.length){
            return idxMain;
        }

        // console.log(countMatch);

        if (countMatch === 0){
            idxMain ++;
        } else {
            idxMain += (countMatch - kmpBorderFunction(patternString, countMatch));
        }
    }
    return -1;
}

function kmpBorderFunction(patternString, countMatch){
    // return maximum prefix length
    let length = 0;
    let borderArr = [0];

    for (let i=1; i <= countMatch-1; i++){
        if (patternString[i] === patternString[length]){
            length++;
            borderArr[i] = length;
        } else {
            if (length > 0){
                length = borderArr[length-1];
                i--;
            } else {
                borderArr[i] = 0;
            }
        }
        // console.log("i = " + i + "\n" + borderArr);
    }
    return borderArr[countMatch-1];
}

export default kmp;
