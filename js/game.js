class Game{
   
    constructor(){}class Game{

    constructor(){

    }


    getState(){
      
        var gameStateRef=database.ref('gameState');

        gameStateRef.on("value",function(data){
              
              gameState=data.val();
        });

    }

   start(){
    if(gameState===0){
        form=new Form();
        form.display();

        player = new Player();

        player.getCount();
    }
    car1= createSprite(375,200,100,100);
    car1.addImage(carImg1);
    car2= createSprite(575,200,100,100);
    car2.addImage(carImg2);
    car3= createSprite(775,200,100,100);
    car3.addImage(carImg3);
    car4= createSprite(975,200,100,100);
    car4.addImage(carImg4);
    
    cars=[car1,car2,car3,car4];

}

play(){
    background('white');
    form.disappear();
    textSize(50);
    text('Game Start!',100,200);

    Player.getGameInfo();

    var pos=150;

    var y;
    background('white');
    if(gameInfo!=undefined){

        for(var i=1;i<=4;i++){
           
            var playerIndex="player"+i;

            y = displayHeight-gameInfo[playerIndex].distance;

            cars[i-1].y=y;
            
            if(player.index===i){
                cars[i-1].shapeColor="red";
                camera.position.x=displayWidth/2  ;
                camera.position.y=cars[i-1].y;
             }
            else{
                cars[i-1].shapeColor="black";
            }

            

        }


       
    }
    
    if(keyDown(UP_ARROW)){
        player.distance = player.distance+10;
        player.updateDetails();
    }


   

   drawSprites();


}


updateState(state){
      
    database.ref('/').update({
        gameState:state
    })

}
      

}


       getState(){

         var gameStateRef= database.ref('gameState');
         gameStateRef.on("value", function(data){
            gameState= data.val();
          
            
         });

    }

   start(){

        if(gameState===0){

            player=new Player();

            player.getCount();
            player.getFinishedPlayers();
       
            form=new Form();
            form.display();


            car1 = createSprite(375,200);
            car1.addImage("car1",carImg1);
            car1.depth=2;
            
 
            car2 = createSprite(575,200);
            car2.addImage("car2",carImg2);
           
 
            car3 = createSprite(775,200);
            car3.addImage("car1",carImg3);
           
 
            car4 = createSprite(975,200);
            car4.addImage("car4",carImg4);
            
            
            cars = [car1, car2, car3, car4];

            obstacles=createGroup();

           var xPos=0;
           var yPos=0;

           for(var i=0;i<=5;i++){
                xPos=random(200,950);
                yPos=random(-height*4,height-300);
                obs=createSprite(xPos,yPos);
                obs.addImage("obstacle",obsImg);
                
                obs.depth=1;
                obstacles.add(obs);
                
                
           }
            

         }
        

   }

   play(){
      textSize(30);
      text('Game Start!',120,100);
      form.disappear();

      Player.getPlayerInfo();//called it with player object
      
      background("black");
      
      if(allPlayers!==undefined){
         image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
         drawSprites();
         for(var i=1;i<=4;i++){

            var playerIndex="player"+i;

            if(player.index===i){
                
                fill('red');
                camera.position.x=displayWidth/2;
                camera.position.y=cars[i-1].y;
             }
             else{
                 fill('black');
             }

            textAlign(CENTER);
            text(allPlayers[playerIndex].name,cars[i-1].x,cars[i-1].y+75);

            x=allPlayers[playerIndex].xPos;
            y=displayHeight-allPlayers[playerIndex].distance;

           cars[i-1].x=x;
           cars[i-1].y=y;
          
          
           
       }
      }

      if(player.distance>3516&&passedFinish===false){


         player.rank=finishedPlayers+1;
      
         Player.updateFinishedPlayers();
         player.update();
         
         passedFinish=true;
       


    
      }
      if(passedFinish===false){
      
      if(keyIsDown(UP_ARROW)){
                
         if(cars[player.index-1].isTouching(obstacles)){
             slidingSound.play();
             player.distance=player.distance+2;
                
         } 
         else{
            player.distance=player.distance+10;
          
        }
        player.update();
        
   
 }
 
     if(keyIsDown(LEFT_ARROW)){

        if(cars[player.index-1].isTouching(obstacles)){
            slidingSound.play();
            player.xPos-=2;
           
        } 
        else{
            player.xPos-=5;
        }  
        player.update();
    
    }
    if(keyIsDown(RIGHT_ARROW)){

        if(cars[player.index-1].isTouching(obstacles)){
            slidingSound.play();
            player.xPos+=2;
        } 
        else{
            player.xPos+=5;
        } 
        player.update(); 
    }

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

      textAlign(CENTER);
      textSize(50);
      fill('black');
      
      for(var i=1;i<=4;i++){

         var playerIndex="player"+i;
         var place=allPlayers[playerIndex].rank;
         var name=allPlayers[playerIndex].name
        
         if(place===1){
             text("1st: "+name,0,85);
         }
        else if(allPlayers[playerIndex].rank===2){
             text("2nd: "+name,displayWidth/4,displayHeight/9+73);
         }
        else if(allPlayers[playerIndex].rank===3){
             text("3rd: "+name,-displayWidth/4,displayHeight/10+76);
         }
         else{
            textSize(30);
            text("Honorable Mention: "+name,0,225)

         }

       }

   }

   update(state){
      database.ref('/').update({
         gameState:state
    });
   
   }

  



}
