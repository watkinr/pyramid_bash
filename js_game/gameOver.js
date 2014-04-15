/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function GameOver(context){
    
    this.context = context;
    this.splashPyramids = [];
    this.setFill();
    this.fillSplashWithPyramids();
};

GameOver.prototype.fillSplashWithPyramids = function(){
    
    for(var i = 0; i < 20; i++){
        
        var pyramid = new Pyramid(this.context);
       
        this.splashPyramids.push(pyramid);
        
    }    
};

GameOver.prototype.clearThemIfOffTheScreen = function(){
    
    for(var i = 0; i < this.splashPyramids.length; i++){
        
        this.animateSplashPyramid(this.splashPyramids[i]);
        
    }
    
    
    this.context.fillText("click to play again or enter score below", 2, 500);
    
};

GameOver.prototype.animateSplashPyramid = function(thePyramid){
    
    thePyramid.inflateAndDraw();
    
    thePyramid.rotation += 3  * Math.PI / 180; //to radians
    
    
};

GameOver.prototype.animateThePyramids = function(){
    
    for(var i = 0; i < this.splashPyramids.length; i++){
        
        
        this.animateSplashPyramid(this.splashPyramids[i]);
        
    }
    
};

GameOver.prototype.setFill = function(){
    
    this.context.fillStyle = "blue";
    this.context.font = "bold 75px Arial";
                  
};

GameOver.prototype.displayGameOverAndAnimate = function(){
    
    this.context.fillText("Game Over", 110, 325);
    this.animateThePyramids();
    this.clearThemIfOffTheScreen();
    
};
