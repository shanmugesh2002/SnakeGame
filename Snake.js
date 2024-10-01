const playBoard=document.querySelector('.playboard');
let scoreElement=document.querySelector('.score');
let score=0;
let highscoreElement=document.querySelector('.highscore');
let arrows=document.querySelectorAll('.controls i');
let snakeX=13,snakeY=23;
let foodX,foodY;
let velocityX=0,velocityY=0;
let snakeBody=[];
let gameOver=false
let setIntervalId;

const handleGameOver=()=>{
    clearInterval(setIntervalId);
    alert("Game over! press ok to restart");
    location.reload();
}

let highscore=localStorage.getItem('High-score') || 0;
const changeDirection=(e)=>{
   if(e.key === "ArrowUp" && velocityX != 1){
    velocityX=-1;
    velocityY=0;
   }else if (e.key === "ArrowDown" && velocityX !=-1){
    velocityX=1;
    velocityY=0;
   }
   else if (e.key === "ArrowLeft" && velocityY != 1){
    velocityX=0;
    velocityY=-1;
   }
   else if (e.key === "ArrowRight" && velocityY != -1){
    velocityX=0;
    velocityY=1;
   }
 }

 arrows.forEach(key=>{
    key.addEventListener('click',() =>changeDirection({ key: key.dataset.key }));
})
const changeFoodPosition=()=>{
     foodX=Math.floor(Math.random()*30 +1);
     foodY=Math.floor(Math.random()*30 +1);
}
const initGame=()=>{
    if (gameOver) return handleGameOver();
 let createFood=`<div class="food" style="grid-area:${foodX} / ${foodY}"></div>`
    if(snakeX === foodX && snakeY === foodY){
       
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        scoreElement.innerHTML=`Score : ${score}`;
        highscore=score>= highscore ? score : highscore;
        localStorage.setItem('High-score',highscore);
        highscoreElement.innerHTML=`HighScore : ${highscore}`;
    }
    for(i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeX >=30 || snakeX <=0 ||snakeY >=30 || snakeY <=0){
       gameOver=true
    }
    snakeBody[0]=[snakeX,snakeY];
    for(i=0;i<snakeBody.length;i++){
       createFood+=`<div class="head" style="grid-area:${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
       if(i!==0 && snakeBody [0][1]=== snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]){
        gameOver=true;
       }
    }
   
    snakeX+= velocityX;
    snakeY +=  velocityY;
    
    playBoard.innerHTML=createFood;
}
document.addEventListener('keydown',changeDirection);
setIntervalId= setInterval(initGame,125);
changeFoodPosition();
initGame();
