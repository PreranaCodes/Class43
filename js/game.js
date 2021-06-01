class Game{
   
    constructor(){}


       getState(){

         var gameStateRef= database.ref('gameState');
         gameStateRef.on("value", function(data){
            gameState= data.val();
          
            
         });

    }

   async start(){

        if(gameState===0){

            player=new Player();

            var playerCountRef=await database.ref('playerCount').once("value");

            player.getCount();
            player.getFinishedPlayers();

       
            form=new Form();
            form.display();


            car1=createSprite(375,200);
            car1.addImage(car1Img);
            car1.depth=2;
            car2=createSprite(575,200);
            car2.addImage(car2Img);
            car3=createSprite(775,200);
            car3.addImage(car3Img);
            car4=createSprite(995,200);
            car4.addImage(car4Img);


            cars=[car1,car2,car3,car4];

            var obsX=0;
            var obsY=0;

            obstacleGroup=createGroup();

            for(var i=1;i<=5;i++){

               obsX=random(200,950);
               obsY=random(-height*4,height-300);

               obstacle=createSprite(obsX,obsY);
               obstacle.depth=1;
               obstacle.addImage(obsImg);
               obstacleGroup.add(obstacle);

               
            }         

         }
        

   }

   play(){
      textSize(30);
      text('Game Start!',120,100);
      form.disappear();

      Player.getPlayerInfo();
      
      background("black");
      
      if(allPlayers!==undefined){

         image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
         drawSprites();

         for(var i=1;i<=4;i++){

            var playerIndex="player"+i;

            textAlign(CENTER);
            x=allPlayers[playerIndex].xPos;
            y=displayHeight-allPlayers[playerIndex].distance;
            cars[i-1].x=x;
           
          
           if(player.index===i){
               
               fill('red');
               cars[i-1].y=y;
               camera.position.x=displayWidth/2;
               camera.position.y=cars[i-1].y;
              
            }
            else{
               
               fill('white');
               var diff=displayHeight-allPlayers[playerIndex].screenSize;
               if(diff>0){
                  cars[i-1].y=y-diff;
               }
               else{
                  cars[i-1].y=y+diff;
               }

               
              
            }
            text(allPlayers[playerIndex].name,cars[i-1].x,cars[i-1].y+75);
       }
      }
     if(passedFinished===false){
      if(keyIsDown(UP_ARROW)){
         if(cars[player.index-1].isTouching(obstacleGroup)){
            player.distance=player.distance+2;
            player.update();
            slidingSound.play();
         }
         else {
         player.distance=player.distance+10;
         player.update();
         //player.distance+=10;
         }
        }

     if(keyIsDown(LEFT_ARROW)){
        if(cars[player.index-1].isTouching(obstacleGroup)){
         player.xPos-=2;
         player.update();
         slidingSound.play();
        }
        else{
         player.xPos-=10;
         player.update();
        }
        
        
     }
        
        
    if(keyIsDown(RIGHT_ARROW)){
      if(cars[player.index-1].isTouching(obstacleGroup)){
         player.xPos+=2;
         player.update();
         slidingSound.play();
        }
        else{
         player.xPos+=10;
         player.update();
        }
        }
     } 
     
        
        
    if(player.distance>displayHeight*5-80&&passedFinished===false){
           player.rank=finishedPlayers+1;
           Player.updateFinishedPlayers();
           passedFinished=true;
           player.update();

        }
    




   }
    displayRanks(){

      background('lightblue');

      camera.position.x=0;
      camera.position.y=0;

      imageMode(CENTER);

      image(bronzeImg,-displayWidth/4,-100+displayHeight/9,200,240);
      image(silverImg,displayWidth/4,-100+displayHeight/10,225,270);
      image(goldImg,0,-100,250,300);

      for(var i=1; i<5;i++){
         
         var playerIndex="player"+i;

         var place=allPlayers[playerIndex].rank;
         var name=allPlayers[playerIndex].name;

         textAlign(CENTER);
         textSize(50);


         if(place===1){
            text("1st: "+name,0,85);
         }
         else if(place===2){
            text("2nd: "+name,displayWidth/4,displayHeight/9+73);
         }
         else if(place===3){
            text("3rd: "+name,-displayWidth/4,displayHeight/10+76);
         }

         else{
            textSize(30);
            text("Honorable Mention: "+name,0,225);
         }
        

         
      }

    }

   update(state){
      database.ref('/').update({
         gameState:state
    });
   
   }

  



}
