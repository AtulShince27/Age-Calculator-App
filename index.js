const getDay = document.getElementById('day');
const getMonth = document.getElementById('month');
const getYear = document.getElementById('year');
const getSubmitButton = document.getElementById('submitBtn')

let dayRegExp = /([0-2][0-9]|3[0-1])/;
let monthRegExp = /([1-9]|1[0-2])/;
let yearRegExp = /([0-1][0-9][0-9][0-9]|(20[0-1][0-9]|202[0-3]))/;
const daysInMonth = {
    1 : 31,
    2 : 28,
    3 : 31,
    4 : 30,
    5 : 31,
    6 : 30,
    7 : 31,
    8 : 31,
    9 : 30, 
    10 : 31, 
    11 : 30, 
    12 : 31
}
let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth()+1;
let currentYear = currentDate.getFullYear();
function verifyUserInput(userInputDayValue, userInputMonthValue, userInputYearValue){
    let dayErrorMsg = document.querySelector('.invalid-day-message');
    let monthErrorMsg = document.querySelector('.invalid-month-message');
    let yearErrorMsg = document.querySelector('.invalid-year-message');
    let dayHeaderText = document.querySelector('.dh');
    let monthHeaderText = document.querySelector('.mh');
    let yearHeaderText = document.querySelector('.yh');
    console.log(userInputDayValue);
    if(
        !userInputDayValue ||
        !userInputMonthValue ||
        !userInputYearValue
    ){
        if(!userInputDayValue){
            dayErrorMsg.classList.add('visible');
            dayErrorMsg.innerText = 'This field is required';
            getDay.classList.add('input-error');
            getDay.classList.remove('input-valid');
            dayHeaderText.classList.add('error-header');
            dayHeaderText.classList.remove('input-header');
        }
        if(!userInputMonthValue){
            monthErrorMsg.classList.add('visible');
            monthErrorMsg.innerText = 'This field is required';
            getMonth.classList.add('input-error');
            getMonth.classList.remove('input-valid')
            monthHeaderText.classList.add('error-header');
            monthHeaderText.classList.remove('input-header');
        }
        if(!userInputYearValue){
            yearErrorMsg.classList.add('visible');
            yearErrorMsg.innerText = 'This field is required';
            getYear.classList.add('input-error');
            getYear.classList.remove('input-valid');
            yearHeaderText.classList.add('error-header');
            yearHeaderText.classList.remove('input-header');
        }
    } else if(
        dayRegExp.test(userInputDayValue) === true &&
        monthRegExp.test(userInputMonthValue) === true && 
        yearRegExp.test(userInputYearValue) === true
    ){
        monthErrorMsg.classList.remove('visible');
        getMonth.classList.remove('input-error');
        getMonth.classList.add('input-valid')
        monthHeaderText.classList.remove('error-header');
        monthHeaderText.classList.add('input-header');
        dayErrorMsg.classList.remove('visible');
        getDay.classList.remove('input-error');
        getDay.classList.add('input-valid');
        dayHeaderText.classList.remove('error-header');
        dayHeaderText.classList.add('input-header');
        yearErrorMsg.classList.remove('visible');
        getYear.classList.remove('input-error');
        getYear.classList.add('input-valid');
        yearHeaderText.classList.remove('error-header');
        yearHeaderText.classList.add('input-header');
        return true
    } else{
        if(userInputMonthValue > 12 || userInputMonthValue < 0){
            monthErrorMsg.classList.add('visible');
            monthErrorMsg.innerText = 'Must be a valid month';
            getMonth.classList.add('input-error');
            getMonth.classList.remove('input-valid')
            monthHeaderText.classList.add('error-header');
            monthHeaderText.classList.remove('input-header');
            if(userInputDayValue > 31){
                dayErrorMsg.classList.add('visible');
                dayErrorMsg.innerText = 'Must be a valid day';
                getDay.classList.add('input-error');
                getDay.classList.remove('input-valid');
                dayHeaderText.classList.add('error-header');
                dayHeaderText.classList.remove('input-header');
            }
        } else if(monthRegExp.test(userInputMonthValue) === true){
            if(userInputDayValue > daysInMonth[userInputMonthValue]){
                dayErrorMsg.classList.add('visible');
                dayErrorMsg.innerText = 'Must be a valid day';
                getDay.classList.add('input-error');
                getDay.classList.remove('input-valid');
                dayHeaderText.classList.add('error-header');
                dayHeaderText.classList.remove('input-header');
            }
        } 
        if(userInputYearValue > currentYear){
            yearErrorMsg.classList.add('visible');
            yearErrorMsg.innerText = 'Must be in the past';
            getYear.classList.add('input-error');
            getYear.classList.remove('input-valid');
            yearHeaderText.classList.add('error-header');
            yearHeaderText.classList.remove('input-header');
        }
        return false;
    }
}
function getValueOfMonthAndDay(month, day, userInputMonthValue, userInputDayValue, userInputYearValue) {
    let result = [];
    for(let i = 1; i <= 12; i++){
        let equation = userInputMonthValue + i;
        if(currentMonth == (equation % 12)){
            month = i;
            break;
        }
    }
    if(userInputDayValue > currentDay){
        month--;
        if(userInputMonthValue == 2 && userInputYearValue % 4 != 0){
            day = (daysInMonth[userInputMonthValue] - userInputDayValue) + currentDay;
        } else if(userInputMonthValue == 2 && userInputYearValue % 4 == 0){
            console.log('inside the exception case');
            day = ((daysInMonth[userInputMonthValue]+1) - userInputDayValue) + currentDay;
        } else {
            day = (daysInMonth[userInputMonthValue] - userInputDayValue) + currentDay;
        }
    } else{
        day = currentDay - userInputDayValue;
    }
    result.push(day);
    result.push(month);
    return result;
}
function calculateAge() {
    let userInputDayValue = parseInt(getDay.value);
    let userInputMonthValue = parseInt(getMonth.value);
    let userInputYearValue = parseInt(getYear.value);
    console.log(userInputDayValue);
    let getVerify = verifyUserInput(userInputDayValue, userInputMonthValue, userInputYearValue);
    if(getVerify){
        let yearInnerText = '';
        let dayInnerText = '';
        let monthInnerText = '';
        let age = 0;
        let month = 0;
        let day = 0;
        if(userInputDayValue == currentDay && userInputMonthValue == currentMonth){
            age = currentYear - userInputYearValue;
        } else if(currentMonth > userInputMonthValue){
            age = currentYear - userInputYearValue;
            [day , month] = getValueOfMonthAndDay(month, day, userInputMonthValue, userInputDayValue, userInputYearValue);
        } else {
            age = currentYear - userInputYearValue - 1;
            [day, month] = getValueOfMonthAndDay(month, day, userInputMonthValue, userInputDayValue, userInputYearValue);
        }
        yearInnerText = age;
        dayInnerText = day;
        monthInnerText = month;
        let numOfYears = document.getElementById('numOfYears');
        numOfYears.innerText = age;
        let numOfMonths = document.getElementById('numOfMonths');
        numOfMonths.innerText = month;
        let numOfDays = document.getElementById('numOfDays');
        numOfDays.innerText = day;
    } 
}


