let cvs = document.getElementById('canvas');
let ctx = cvs.getContext("2d");

let bg = new Image();
let tentUp = new Image();
let tentBottom = new Image();
let girl = new Image();
let fog = new Image();

bg.src = "../img/Background.jpg";
tentUp.src = "../img/tentacleup.png";
tentBottom.src = "../img/tentacle.png";
fog.src = '../img/fog-1.png';

let posX = 50,
    posY = 1,
    gap = 150,
    score = 0;

// Нажатие кнопки, чтобы поднять персонажа
document.addEventListener('keydown', moveUp);

function moveUp() {
  posY -= 30;
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
// Цикл для щупалец
  for(let i = 0; i < tentArr.length; i++) { 
    ctx.drawImage(tentUp, tentArr[i].x, tentArr[i].y);
    ctx.drawImage(tentBottom, tentArr[i].x, tentArr[i].y + tentUp.height + gap);

    tentArr[i].x = tentArr[i].x - 2;

    if(tentArr[i].x === 350) {

      tentArr.push({
        x: cvs.width,
        y: Math.round((Math.random() * tentUp.height) - tentUp.height)
      })
    }

    if( posX + girl.width >= tentArr[i].x + 50
      && posX <= tentArr[i].x + tentUp.width
      && (posY <= tentArr[i].y + tentUp.height - 25
      || posY + girl.height - 20 >= tentArr[i].y + tentUp.height + gap)) {
      location.reload();
    }

    if(tentArr[i].x === 20) {
      score++;
    }

  }
// Цикл для тумана
  moveFog();
//Увеличить нас счетчик
  upScore();

  ctx.drawImage(girl, posX, posY );

  posY = posY + 1.5;
  
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
  for(let j = 0; j < fogArr.length; j++) {
    ctx.drawImage(fog, fogArr[j].x, 0, 650, 366);

    fogArr[j].x = fogArr[j].x - 1;

    if(fogArr[j].x === -1) {
      fogArr.push({
        x: cvs.width
      })
    }
  }
}

//Выбор героя
function selectGirl() {
  let witch = document.querySelectorAll('.witches__item a img'),
      listWitches = document.querySelector('.witches'),
      arrWitches = ['girlm1', 'girlm2', 'girlm3', 'girlm4'];

  for( let i = 0; i < witch.length; i++ ) {
    witch[i].onclick = function() {
      listWitches.style.display = 'none';
      
      for( let j = 0; j < arrWitches.length; j++ ) {
        if(witch[i].getAttribute('src').includes(arrWitches[j])) {
          girl.src = "../img/" + arrWitches[j] + ".png";
          draw();
          break;
        }
      }   
    };
  }
}



tentBottom.onload = selectGirl;