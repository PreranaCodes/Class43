var ball,database;
var position;

var gameState=0;
var form,game;
var playerCount;
var player;
var allPlayers;

var cars=[];
var car1,car2,car3,car4;
var x;
var y=0;

var trackImg,carImg1,carImg2,carImg3,carImg4;
var obsImg,obs,obstacles;
var slidingSound;

var passedFinish=false;
var finishedPlayers;

var bronzeImg,silverImg,goldImg;

function preload(){

    trackImg=loadImage('images/track.jpg');
    carImg1=loadImage('images/car1.png');
    carImg2=loadImage('images/car2.png');
    carImg3=loadImage('images/car3.png');
    carImg4=loadImage('images/car4.png');
    obsImg=loadImage('images/f1.png');
    slidingSound=loadSound('sound/sliding.mp3');
    bronzeImg=loadImage('images/bronze.png');
    silverImg=loadImage('images/silver.png');
    goldImg=loadImage('images/gold.png');



}
function setup(){
    createCanvas(displayWidth,displayHeight);
    
    database=firebase.database();

    game=new Game();
    game.getState();
    game.start();

   

}

function draw(){
 
  if(playerCount===4){
      game.update(1);
  }
 if(gameState===1){
      clear();
      game.play();
  }
  if(finishedPlayers===4){
      game.update(2);
  }

 if(gameState===2&&finishedPlayers===4){
      game.displayRanks();
  }
  
  
  

}



