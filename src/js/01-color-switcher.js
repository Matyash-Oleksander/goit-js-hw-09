const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const PROMT_DELAY = 1000;
let timerId = null;

console.log('START');

btnStart.addEventListener('click', onChangeColorStart);
btnStop.addEventListener('click', onChangeColorStop);

function onChangeColorStart(evt) {
  //  console.log("Старт зміни кольору");
  btnStart.setAttribute('disabled', true);
  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();

    // console.log("Кнопка НЕактивна");
  }, PROMT_DELAY);
}

function onChangeColorStop(evt) {
  // console.log("Фініш зміни кольору");
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
  // console.log("Кнопка активна");
}

function getRandomHexColor() {
  // console.log("Старт!!!!!!!!!!!!!!!!!!!!!!");
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
