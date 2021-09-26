//Dark Mode Toggle
document.querySelector('.dark-mode-switch').onclick = () => {
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('body').classList.toggle('light')
    document.querySelector('emoji-picker').classList.toggle('dark')
    document.querySelector('emoji-picker').classList.toggle('light')
}

//Check Leap Year
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar-box');
let calendar_days = document.querySelector('.calendar-days');

const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'August', 'Sep', 'Oct', 'Nov', 'Dec'];

let month_picker = document.querySelector('#month-picker');

month_picker.onclick = () => {
    month_list.classList.add('show');
}
//Generate Calendar
generateCalendar = (month, year) => {
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let currDate = new Date();

    month_picker.innerHTML = month_names[month];
    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover');
            day.innerHTML = i - first_day.getDay() + 1;
            if (i - first_day.getDay() + 1 === currDate.getDate() &&
                year === currDate.getFullYear()
                && month === currDate.getMonth()) {
                day.classList.add('curr-date');
            }
        }
        calendar_days.appendChild(day);
    }
}

let month_list = calendar.querySelector('.month-list');
let select_day = new Date();

month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
    month.onclick = () => {
        month_list.classList.remove('show');
        curr_month.value = index;
        generateCalendar(curr_month.value, curr_year.value);
        select_day.setMonth(curr_month.value);
    }
    month_list.appendChild(month);
});

document.querySelector('.calendar .prev').onclick = () => {
    --curr_year.value;
    generateCalendar(curr_month.value, curr_year.value);
    select_day.setFullYear(curr_year.value);
};
document.querySelector('.calendar .next').onclick = () => {
    ++curr_year.value;
    generateCalendar(curr_month.value, curr_year.value);
    select_day.setFullYear(curr_year.value);
};

let currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);

calendar_days.addEventListener('click', (event) => {
    let active_box = calendar_days.querySelector('.active');
    if (active_box)
        active_box.classList.remove('active');

    if (event.target.className === 'calendar-day-hover') {
        event.target.classList.add('active');

        let title_date = document.querySelector('.title h3');
        select_day.setDate(event.target.innerText);
        setDate(select_day);
    }
});


function init() {
    setInterval(setTime, 1000);
}
init();

function setDate(currDate) {
    const select_date = document.querySelector('.center h3');

    let day_array = new Array('일', '월', '화', '수', '목', '금', '토');
    const today = currDate;
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = day_array[today.getDay()];

    select_date.innerHTML = `
        ${year}.${month}.${date}.${day}요일
    `;
}

function setTime() {
    const curr_time = document.querySelector('.time h1');
    const time = new Date();

    const hour = Zero(time.getHours());
    const minute = Zero(time.getMinutes());
    const seconds = Zero(time.getSeconds());

    function Zero(num) {
        return (num < 10 ? '0' + num : num);
    }
    curr_time.innerHTML = `${hour}:${minute}:${seconds}`;
}
const getJSON = function (url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
        const status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

getJSON('http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=54f5b69935a3748952d34a710296d5d9&units=metric',
    function (err, data) {
        //null 또는 err
        if (err !== null) {
            alert('예상치 못한 오류가 발생하였습니다' + err);
        } else {
            setWeather(data);
        }
    }
);

function setWeather(data) {
    let location = document.querySelector('.location');
    let currentTemp = document.querySelector('.current-temp');
    let icon = document.querySelector('.icon');
    let weatherIcon = data.weather[0].icon;

    location.append(data.name);
    currentTemp.append(`${data.main.temp}˚`);
    icon.innerHTML = `<img src='http://openweathermap.org/img/wn/${weatherIcon}.png'>`;
}

