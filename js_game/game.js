function Game(canvas, context){
    
    
    this.splash = true;
    this.grid = new Grid();
    this.context = context;                                         //absorbs the canvas context
    this.canvas = canvas;                                           //absorbs the canvas element
    this.defender = new Defender(canvas, context);
    this.centerX = (this.canvas.width / 2);                         //center X position of canvas
    this.centerY = (this.canvas.height / 2);                        //center Y position of canvas
    this.gameIsActive = false;                                       //active when a game is going
    
    this.score = 0;                                                 //user score starts at zero
    this.temp = Math.floor(Math.random() * 8);                      //determines which vector generates a pyramid
    this.splashLetter = new SplashLetter(context);
    this.gameOverSplash = new GameOver(context);
    this.activatedGameOver = false;
    this.vectors = [];                                              //vectors array/container
    this.setVectors();
    this.resetAll();
    this.setFill();
    
}


//resets all functionality when the game is over with the exception of the user score.
Game.prototype.resetAll = function(){
    
    this.generatePyramid = false;                                   //flips true when a new pyramid is made
    this.gameIsOver = false;                                        //flipped to true when game is over
    this.level = 1;                                                 //starting level for the game
    this.levelScore = 0;                                            //starting level score for the game.  Resets every 10 points
    this.timer = 0;                                                 //timer to calculate making new pyramids
    this.generateTimer = 400;                                       //value used to calculate when to make a new pyramid

    for(var i = 0; i < this.vectors.length; i++){
        
        this.rebootVectorScorePoints(this.vectors[i]);
        
    }
    
};

Game.prototype.setFill = function(){
    
    this.context.fillStyle = "blue";
    this.context.font = "bold 25px Arial";
                  
};

//puts all the vector objects in the array.  Sets them accordingly
Game.prototype.setVectors = function(){
    
    var count = 0;
    
    for(var i = 0; i < 8; i++){
        
        var vector = new Vector(this.context, count);
        this.vectors.push(vector);
        count++;
    }  
};

//draws the grid of the game
Game.prototype.drawGrid = function(){
    
    if(this.gameIsActive){
        
        this.grid.draw(this.context, this.canvas, this.centerX, this.centerY);
        
    } 
};


//if a pyramid is knocked off the screen, score a point for the overall score and the level score
//reset addPoint from the vector that the pyramid is killed in.
//check if the levelScore is high enough to level up
Game.prototype.checkToScorePoint = function(theVector){
    
    if(theVector.addPoint && !this.gameIsOver){
              
        this.score += 1;
        this.levelScore +=1;
        
        theVector.addPoint = false;
        
        this.checkToLevelUp();
    }
        
};

Game.prototype.rebootVectorScorePoints = function(theVector){
    
    theVector.addPoint = false;
    
    
};


//if the levelScore is higher than the specified target number, level increases, pyramid generator
//speeds up, overall timer is reset.
Game.prototype.checkToLevelUp = function(){
    
    if(this.levelScore > 9 && this.level < 16){
        
        this.level += 1;
        this.levelScore = 0;
        this.timer = 0;
        this.generateTimer -= 20;
    }   
};



//Draws all the pyramids on the screen and checks when a pyramid has successfully invaded the 
//defender territory
Game.prototype.drawAllPyramidsFromVectors = function(theDefender){
    
    for(var i = 0; i < this.vectors.length; i++){
       
        this.vectors[i].drawPyramids(theDefender);
        
        this.checkToScorePoint(this.vectors[i]);
        
        if(this.vectors[i].pyramids.length > 6){
            
            this.gameIsOver = true;
            
            
        }
        
    }
};


//if the game is over, all pyramids are wiped off the screen.  The pyramid arrays from each vector
//are cleaned back to 0. gameIsActive flag flipped to false and game ends.  All attributes besides
//score are reset in case user wants to play again.
Game.prototype.clearScreenAndResetIfGameIsOver = function(){
    
    if(this.gameIsOver){
        
        for(var i = 0; i < this.vectors.length; i++){
        
            this.vectors[i].wipePyramidsOffScreen();
        
        }   
    }
    
    if(this.gameIsOver && this.gameIsActive){
        
        if(this.timer > (this.generateTimer - 10)){
            
            
            for(var i = 0; i < this.vectors.length; i++){
                
            
                this.vectors[i].pyramids.length = 0;
            
            }
            
            this.gameIsActive = false;
            
//            this.resetAll();
            this.activatedGameOver = true;
        }
        
    }
};

//when the timer becomes higher than generateTimer, generatePyramid is flipped to true.
//selected vector is flipped to true to produce a new pyramid and draw it to the screen.
Game.prototype.checkToProducePyramids = function(){
    
    if(this.generatePyramid){
                 
        var selectedVector = Math.floor(Math.random() * 8);          
                 
        this.vectors[selectedVector].isGenerating = true;
                
        this.generatePyramid = false;
    }
    
};


//adds time to the overall timer count
Game.prototype.countTimerUp = function(timerSpeed){
    
    this.timer += timerSpeed;
    
};


//when the timer variable becomes greater than the generateTimer variable, the flag generatePyramid
//is flipped to true and a new pyramid is produced.  Timer is reset to 0;
Game.prototype.resetTimerAndGenerate = function(){
    
    if(this.timer > this.generateTimer){
        
        this.generatePyramid  = true;
        
        this.timer = 0;
        
    }        
};

//countTImerUp and resetTimerAndGenerate kept in this convenient method.
Game.prototype.trackTimerAndPyramidGenerator=  function(timerSpeed){
    
    this.countTimerUp(timerSpeed);
       
    this.resetTimerAndGenerate();
};


//starts a new game and clears user score to 0;
Game.prototype.start = function(){
    
    if(!this.gameIsActive){
        
        this.score = 0;
        this.splash = false;
        this.activatedGameOver = false;
        this.gameIsActive = true;       
    }
};

//game action when gameIsActive flag is flipped to true.
Game.prototype.gameActivity = function(theDefender){
        
    if(this.gameIsActive){
             
        this.drawGrid();
        
        this.context.fillText("Score : " + this.score, 10, 25);
        this.context.fillText("Level : " + this.level, 10, 635);
        
        this.defender.makeAllMovements();
 
        this.trackTimerAndPyramidGenerator(2);
 
        this.checkToProducePyramids();
 
        this.drawAllPyramidsFromVectors(theDefender);        
        
        this.clearScreenAndResetIfGameIsOver();
        
    } 
    
};

Game.prototype.splashScreen = function(){
    
    if (this.splash){
        
        this.splashLetter.doTheSplash();
    }
    
};

Game.prototype.runGameOverScreen = function(){
    
    this.gameOverSplash.displayGameOverAndAnimate();
    this.resetAll();

};

Game.prototype.defenderAttackMovements = function(){
        
    this.defender.setOriginalCoordinatesAndAttack();
};

Game.prototype.defenderleftTurnOrJump = function(){
    
    this.defender.makeLeftTurnOrLeftJump();
    
};

Game.prototype.defenderUpTurnOrJump = function(){
    
    this.defender.makeUpTurnOrUpJump();
    
};

Game.prototype.defenderRightTurnOrJump = function(){
    
    this.defender.makeRightTurnOrRightJump();
};

Game.prototype.defenderDownTurnOrJump = function(){
    
    
    this.defender.makeDownTurnOrDownJump();
    
    
};
