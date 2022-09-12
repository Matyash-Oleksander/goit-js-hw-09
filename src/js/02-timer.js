// імпорт стилів
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// window.alert('Please choose a date in the future');

const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute('disabled', true);

btnStart.addEventListener('click', onClickStart);

var currentTime = null;
const startTime = Date.now();
var deltaTime = null;

function onClickStart(evt) {
  console.log('Старт ТАЙМЕР');
  timer.start();
}

const fixedTime = document.querySelector('.timer');

//  ІНІЦІАЛІЗАЦІЯ ЗМІННОЇ!!!!
const inputDate = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      clearInterval(timer);
      Notiflix.Notify.warning('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      currentTime = selectedDates[0];
      deltaTime = currentTime - startTime;
    }
  },
};

flatpickr(inputDate, options);

const timer = {
  intervalId: null,

  start() {
    this.intervalId = setInterval(() => {
      if (deltaTime <= 0) {
        console.log('Акція завершилась!!!!!!!!!!!!!!!!');
        deltaTime = 0;
        // var time = convertMs(endTime);
        // updateClockFace(time);
        clearInterval(this.intervalId);
      }
      var time = convertMs(deltaTime);
      updateClockFace(time);
    }, 1000);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

// Функція для зворотнього відліку
function convertMs(ms) {
  deltaTime = deltaTime - 1000;

  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateClockFace({ days, hours, minutes, seconds }) {
  fixedTime.textContent = `${days} : ${hours} : ${minutes} : ${seconds}`;
  // console.log(inputDate.textContent);
}
