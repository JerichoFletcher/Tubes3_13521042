import { isNumeric } from "./num.js";

const numOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isValidDate(day, month, year){
    if(typeof day !== 'number' || typeof month !== 'number' || typeof year !== 'number')return false;
    return year > 0
        && 1 <= month && month <= 12
        && 1 <= day && day <= numOfDays[month-1] + ((year % 4 === 0 && month === 2) ? 1 : 0);
}

function findTheDay(date) {
    if(typeof date !== 'string')throw new TypeError();

    /* Find the day of a date with Zeller's Congruence */
    let dateArr = date.split("/");
    let dayStr = dateArr[0];
    let monthStr = dateArr[1];
    let yearStr = dateArr[2];
    if(!isNumeric(dayStr) || !isNumeric(monthStr) || !isNumeric(yearStr))throw new Error("Not a valid date format");

    let day = parseInt(dayStr);
    let month = parseInt(monthStr);
    let year = parseInt(yearStr);
    if(!isValidDate(day, month, year))throw new Error("Invalid date");

    if (month === 1 || month === 2){
        month += 12;
        year--;
    }

    // let q = day;
    // let m = month;
    // let k = year % 100;
    // let j = year / 100;
    // let h = q + parseInt(13 * (m+1) / 5) + k + parseInt(k / 4) + parseInt(j / 4) + 5 * j;
    // h = h % 7;
    let q = day;
    let m = month;
    let K = year % 100;
    let J = Math.floor(year / 100);
    let h = (q
        + Math.floor(13 * (m+1) / 5)
        + K + Math.floor(K / 4)
        + Math.floor(J / 4)
        - 2 * J
    ) % 7;
    
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
        default:
            return "???";
    }
}

export default findTheDay;