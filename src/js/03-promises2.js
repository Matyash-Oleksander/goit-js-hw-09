import Notiflix from 'notiflix';

console.log('START!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

const refs = {
  form: document.querySelector('.form'),
  BtnSubmit: document.querySelector('button[type=sumbit]'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  let { delay, step, amount } = onGetData();
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(delay);
        console.log(position);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
    console.log(delay);
    console.log(step);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onGetData() {
  return {
    delay: Number(refs.delay.value),
    step: Number(refs.step.value),
    amount: Number(refs.amount.value),
  };
}
