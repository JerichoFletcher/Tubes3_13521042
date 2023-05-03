function findDay(date){
    const q = getDay(date);
    const m = getMonth(date);
    const k = getYear(date) / 100;
    const j = Math.floor(getYear(date) / 100);

    return (q + Math.round(13 * (m+1) / 5) + k + Math.round(k/4) + Math.round(j/4) + 5*j) % 7;
}

function getDay(date){
    
}

function getMonth(date){

}

function getYear(date){

}