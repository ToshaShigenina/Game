'use strict';

const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 4,
  traffic: 3
};

start.textContent = 'Чтобы начать игру кликни сюда';
car.classList.add('car');

const getQuantityElements = (heightElement) => {
  return Math.floor(document.documentElement.clientHeight / heightElement + 1);
};

const startGame = () => {
  start.classList.add('hidden');
  for (let i = 0; i < getQuantityElements(60); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 60) + 'px';
    line.y = i * 60;
    gameArea.append(line);
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    gameArea.append(enemy);
  }

  setting.score = 0;
  setting.start = true;
  gameArea.append(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
};

const moveRoad = () => {
  let lines = document.querySelectorAll('.line');
  lines.forEach(line => {
    line.y += setting.speed;
    line.style.top = line.y + 'px';
    if (line.y > document.documentElement.clientHeight) {
      line.y = -60;
    }
  });
};

const moveEnemy = () => {
  let enemys = document.querySelectorAll('.enemy');
  enemys.forEach((enemy) => {
    let carRect = car.getBoundingClientRect();
    let enemyRect = enemy.getBoundingClientRect();

    if (carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left &&
      carRect.left <= enemyRect.right &&
      carRect.bottom >= enemyRect.top) {
      setting.start = false;
      start.classList.remove('hidden');
      start.innerHTML = `Чтобы перезапустить игру кликни сюда<br>
                          Счет игры: ${setting.score}`;
    }

    enemy.y += setting.speed / 2;
    enemy.style.top = enemy.y + 'px';

    if (enemy.y >= document.documentElement.clientHeight) {
      enemy.y = -100 * setting.traffic;
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });
};

const playGame = () => {
  if (setting.start) {
    setting.score += setting.speed;
    score.textContent = 'Очки: ' + setting.score;
    moveRoad();
    moveEnemy();

    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    if (keys.ArrowDown && setting.y < gameArea.offsetHeight - car.offsetHeight) {
      setting.y += setting.speed;
    }

    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';

    requestAnimationFrame(playGame);
  }
};

const startRun = (e) => {
  e.preventDefault();
  keys[e.key] = true;
};

const stopRun = (e) => {
  e.preventDefault();
  keys[e.key] = false;
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
