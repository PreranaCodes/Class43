class Form {

    constructor() {

        this.title = createElement('h2');
        this.title.html('Car Racing Game');
        this.title.position(displayWidth/2 - 50, 0);

        this.input = createInput("Name");
        this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);

        this.button = createButton("Play");
        this.button.position(displayWidth/2 + 30, displayHeight/2);

        this.reset = createButton('Reset');
        this.reset.position(displayWidth-100,20);
    }

    disappear(){
        this.title.hide();
        this.greetings.hide();
    }

  
    display() {

        this.button.mousePressed(()=> {

               this.input.hide();
               this.button.hide();
               player.name = this.input.value();

               this.greetings = createElement('h3');
               this.greetings.html("Hello " + player.name);
               this.greetings.position(displayWidth/2 - 70, displayHeight/4); 

               playerCount=playerCount+1;
               player.index=playerCount;
               player.updateCount(playerCount);
               if(playerCount===1){
                player.xPos=375;
                }
                if(playerCount===2){
                    player.xPos=575;
                }
                if(playerCount===3){
                    player.xPos=775;
                }
                if(playerCount===4){
                    player.xPos=975;
                }
                player.update();



        });

        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.update(0);
          });




    }











}