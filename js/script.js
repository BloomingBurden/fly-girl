let cvs = document.getElementById('canvas');
let ctx = cvs.getContext("2d");

let bg = new Image();
let tentUp = new Image();
let tentBottom = new Image();
let girl = new Image();

bg.src = "../img/Background.jpg";
tentUp.src = "../img/tentacleup.png";
tentBottom.src = "../img/tentacle.png";

let gap = 140;


function draw(witch) {
  girl.src = witch;
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(tentUp, 350, 0);
  ctx.drawImage(tentBottom, 350, tentBottom.height + gap);
  ctx.drawImage(girl, 20, 100);
}

function selectGirl() {
  let witch = document.querySelectorAll('.witches__item a img'),
      listWitches = document.querySelector('.witches'),
      arrWitches = ['girlm1', 'girlm2', 'girlm3', 'girlm4'];

  for( let i = 0; i < witch.length; i++ ) {
    witch[i].onclick = function() {
      listWitches.style.display = 'none';
      
      for( let j = 0; j < arrWitches.length; j++ ) {
        if(witch[i].getAttribute('src').includes(arrWitches[j])) {
          draw("../img/" + arrWitches[j] + ".png");
          break;
        }
      }   
    };
  }
}



tentBottom.onload = selectGirl;