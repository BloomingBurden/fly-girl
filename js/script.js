'use strict'

let cvs = document.getElementById('canvas');
let ctx = cvs.getContext("2d");
let sound;

let bg = new Image();
let tentUp = new Image();
let tentBottom = new Image();
let girl = new Image();
let fog = new Image();

bg.src = "img/Background.jpg";
tentUp.src = "img/tentacleup.png";
tentBottom.src = "img/tentacle.png";
fog.src = 'img/fog-1.png';

let posX = 50,
  posY = 1,
  gap = 150,
  score = 0,
  scoreBool,
  difficultOfLevel = {};

// Нажатие кнопки, чтобы поднять персонажа
document.addEventListener('keydown', moveUp);

function moveUp() {
  posY -= difficultOfLevel.keyDown;
}

// Создание щупалец

let tentArr = [];

tentArr[0] = {
  x: cvs.width,
  y: 0
};

//Позиция тумана
let fogArr = [];

fogArr[0] = {
  x: 0,
};

//Функция, которая двигает персонажа
function draw() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(girl, posX, posY);
  // Цикл для щупалец
  for (let i = 0; i < tentArr.length; i++) {
    ctx.drawImage(tentUp, tentArr[i].x, tentArr[i].y);
    ctx.drawImage(tentBottom, tentArr[i].x, tentArr[i].y + tentUp.height + gap);

    tentArr[i].x = tentArr[i].x - difficultOfLevel.temp;

    if (tentArr[i].x === 350) {
      scoreBool = true;

      tentArr.push({
        x: cvs.width,
        y: Math.round((Math.random() * tentUp.height) - tentUp.height)
      });
    }

    if (tentArr[i].x <= 40 && tentArr[i].x >= 20 && scoreBool) {
      score++;
      scoreBool = false;
    }

    if (posX + girl.width >= tentArr[i].x + 50
      && posX <= tentArr[i].x + tentUp.width
      && (posY <= tentArr[i].y + tentUp.height - 25
        || posY + girl.height - 20 >= tentArr[i].y + tentUp.height + gap)) {
      let checkitout = alert('Your score is ' + score);
      location.reload();
      return false;
    }

  }
  // Цикл для тумана
  moveFog();
  //Увеличить нас счетчик
  upScore();

  posY = posY + difficultOfLevel.up;

  requestAnimationFrame(draw);
}

//Увеличивает очки
function upScore() {
  ctx.fillStyle = "#FFF";
  ctx.font = "20px Roboto";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);
}

//Двигает туман
function moveFog() {
  for (let j = 0; j < fogArr.length; j++) {
    ctx.drawImage(fog, fogArr[j].x, 0, 650, 366);

    fogArr[j].x = fogArr[j].x - 1;

    if (fogArr[j].x === -1) {
      fogArr.push({
        x: cvs.width
      });
    }
  }
}

//Выбор героя
function selectGirl() {
  let witch = document.querySelectorAll('.witches__item a img'),
      witchLink = document.querySelectorAll('.witches__item a'),
      listWitches = document.querySelector('.witches'),
      arrWitches = ['girlm1', 'girlm2', 'girlm3', 'girlm4'];

  for (let i = 0; i < witch.length; i++) {
    witchLink[i].onclick = function () {
      listWitches.style.display = 'none';
      goSound();

      for (let j = 0; j < arrWitches.length; j++) {
        if (witch[i].getAttribute('src').includes(arrWitches[j])) {
          girl.src = "img/" + arrWitches[j] + ".png";
          changeLevel(j);
          return;
        }
      }
    };
  }
}

function changeLevel(numLevel = 2) {
  switch (numLevel) {
    case 0:
      difficultOfLevel.temp = 2;
      difficultOfLevel.up = 1.5;
      difficultOfLevel.keyDown = 25;
      break;
    case 1:
      difficultOfLevel.temp = 3;
      difficultOfLevel.up = 2;
      difficultOfLevel.keyDown = 35;
      break;
    case 2:
      difficultOfLevel.temp = 4;
      difficultOfLevel.up = 2.5;
      difficultOfLevel.keyDown = 45;
      break;
    case 3:
      difficultOfLevel.temp = 6;
      difficultOfLevel.up = 3.5;
      difficultOfLevel.keyDown = 55;
      break;
    default:
      return 2;
  }

  girl.addEventListener('load', draw);
}



function goSound() {
  sound = new Audio();
  sound.src = 'sound/bit.ogg';
  sound.loop = true;
  sound.volume = 0.1;
  sound.play()
}

fog.addEventListener('load', selectGirl);