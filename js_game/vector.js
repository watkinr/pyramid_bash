/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Vector(context, vectorNumber){
  
    this.pyramids = [];                                 //array that stores all the pyramids
    this.count = 0;                                     //keeps track of the number of pyramids in the vector
    this.vectorNumber = vectorNumber;                   //used to keep a pyramid in the desired vector
    this.isGenerating = false;                          //flips true when a new pyramid is made
    this.addPoint = false;
    this.context = context;                             //absorbs the general context
};


//creates a new pyramid inside the makePyramid method.  New pyramid is made and pushed into
//the pyramids array
Vector.prototype.pyramidFactory = function(){
    
    var pyramid = new Pyramid(this.context);
        pyramid.vector = this.vectorNumber; 
        this.pyramids.push(pyramid); 
        
        this.pyramids[this.count].isActive = true;
    
};

//makes a new pyramid and inserts it into the pyramids array.
//bumps the count up by one and uses flipAdvancingFlag to move all active pyramids forward
Vector.prototype.makePyramid = function(){
    
    if(this.isGenerating){
        
        this.pyramidFactory();
        
        this.count += 1; 
            
        this.flipAdvancingFlag(); 
    }
    
    this.isGenerating = false;
};

//flips the isAdvancing flag for all the pyramids but the one that is most recently created
Vector.prototype.flipAdvancingFlag = function(){
    
    for(var i = 0; i < (this.pyramids.length - 1); i++){
            
            this.pyramids[i].isAdvancing = true;
                    
    
        }       
};

//deletes the pyramid from the pyramids array if it is killed.  Drops the count by one to 
//maintain an accurate count of all the active pyramids.  Flips addPoint flag to true. used in
//game object with method checkToScorePoint();
Vector.prototype.checkToDestory = function(thePyramid){
    
    if(thePyramid.isOffTheScreen() ){
            
            this.pyramids.shift();
            this.count -= 1;
            this.addPoint = true;
            
        }
    
};


//all active pyramids are given movement functonality and recognize collisions with the defender
//also checks to see whether a pyramid needs to be recycled from a color-match collision
Vector.prototype.drawPyramids = function(theDefender){
    
    this.makePyramid();
    
    for(var i = 0; i < this.pyramids.length; i++){
        
        this.pyramids[i].makeAllMovements(theDefender);
        this.pyramids[i].killPyramid();
        this.checkToDestory(this.pyramids[i]);
    }   
          
};

//all pyramids are cleared off the screen when the game is over.  Method used in the game object
// with method drawAllPyramidsFromVectors()
Vector.prototype.wipePyramidsOffScreen = function(){
    
    for(var i = 0; i < this.count; i++){
        
        this.pyramids[i].isDefeated = true;
    }
    
};