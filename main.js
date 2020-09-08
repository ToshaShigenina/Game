'use strict';

const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const startGame = () => {
  start.classList.add('hidden');
};
const startRun = (e) => {
  e.preventDefault();

};

const stopRun = (e) => {
  e.preventDefault();
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
