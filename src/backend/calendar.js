function findTheDay(date) {
    /* Find the day of a date with Zeller's Congruence */
    let dateArr = date.split("/");
    let day = dateArr[0];
    let month = dateArr[1];
    let year = dateArr[2];
    if (month == 1 || month == 2){
        month += 12;
        year--;
    }

    let q = day;
    let m = month;
    let k = year % 100;
    let j = parseInt(year / 100);
    let h = q + parseInt(13 * (m+1) / 5) + k + parseInt(k / 4) + parseInt(j / 4) + 5 * j;
    h = h % 7;

    console.log(h);
    
    switch (h) {
        case 0 :
            return "Saturday";
        case 1 :
            return "Sunday";
        case 2 :
            return "Monday";
        case 3 :
            return "Tuesday";
        case 4 :
            return "Wednesday";
        case 5 :
            return "Thursday";
        case 6 :
            return "Friday";
    }
}

export default findTheDay;