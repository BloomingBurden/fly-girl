let cvs = document.getElementById('canvas');
let ctx = cvs.getContext("2d");

let bg = new Image();
let tentUp = new Image();
let tentBottom = new Image();
let girl1 = new Image();
let girl2 = new Image();
let girl3 = new Image();
let girl4 = new Image();

bg.src = "../img/Background.jpg";
tentUp.src = "../img/tentacleup.png";
tentBottom.src = "../img/tentacle.png";
girl1.src = "../img/girlm1.png";
girl2.src = "../img/girlm2.png";
girl3.src = "../img/girlm3.png";
girl4.src = "../img/girlm4.png";

let gap = 140;




function draw(witch) {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(tentUp, 350, 0);
  ctx.drawImage(tentBottom, 350, tentBottom.height + gap);
  ctx.drawImage(witch, 20, 100);
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
          draw(eval('girl' + [j + 1]));
          break;
        }
      }   
    };
  }
}



girl4.onload = selectGirl;