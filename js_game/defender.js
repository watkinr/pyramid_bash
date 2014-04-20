/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//canvas and context are the canvas and context called from the main function or activity
function Defender (canvas, context) {
  this.controls = new MovementControls(this);  
  this.x = 300;                                             //initial X starting point
  this.y = 350;                                             //initial Y starting point
  this.frontTipX = (this.x + 20);                           //X coordinate for Defender's front tip
  this.frontTipY = this.y;                                  //Y coordinate for Defender's front tip
  this.ax = 30;                                             //velocity of Defender's attacking X speed
  this.ay = 30;                                             //velocity of Defender's attacking Y speed
  this.vr = 0;                                              //Rotational velocity.    
  this.originalX = 0;
  this.originalY = 0;  
  this.originalTipX = 0;
  this.originalTipY = 0;
  this.distanceMoved = 0;                                   //used to track the distance the Defender travels when it moves cubicles     
  this.color = this.selectTheColor();                       //sets defender's color
  this.canvas = canvas;                                     //absorbs the canvas variable
  this.context = context;                                   //absorbs the context variable
  this.rotation = 0;                                        //tracks the rotation of the Defender
  this.segmentRotation = 0;                                 //used to measure rotations in a quarter-circle
  this.totalRotation = 6.28;                                //tracks whether the Defender has rotated in a full circle.
  this.moving = false;                                      //tracks whether/when the Defender needs to move/stop moving
  this.turning = false;                                     //tracks whether/when the Defender needs to turn/stop turning 
  this.attacking = false;                                   //tracks whether/when the Defender needs to attack/stop attacking
  this.regressing = false;                                  //called when the velocities are reversed from attacking
};


//selects the defender's fill color at random.  The switch and case determines what
//color is determined based on colorSelector's value.
Defender.prototype.selectTheColor = function(){
    
    var attributes = new Attributes();
    
    return attributes.color;
    
};


//draw the defender object
Defender.prototype.draw = function () {
  this.context.save();
  this.context.translate(this.x, this.y);
  this.context.rotate(this.rotation);
  
  this.context.lineWidth = 1;
  this.context.fillStyle = this.color;
  this.context.beginPath();
  this.context.moveTo(-10, 0);
  this.context.lineTo(-10, -10);
  this.context.lineTo(20, 0);
  this.context.lineTo(-10, 10);
  this.context.lineTo(-10, 0);
  this.context.closePath();
  this.context.fill();
  this.context.stroke();
  
  this.context.restore();
};

Defender.prototype.reverseAttack = function(){
    
    this.ax *= -1;
    this.ay *= -1;
    this.regressing = true;
    this.attacking = false;

};

//reachedXBoundary and reachedYBoundary create a small boundary signifying the tip of the defender for when
//it hits invading pyramids, the wall of the canvas, and also determining if it can attack.
//they can be combined in reachedBothBoundaries to create an invisible box that recognises when
//both parties are inside the box

Defender.prototype.reachedBothBoundaries = function(x,y, boundsX, boundsY){
    
    var attributes = new Attributes();
    
    if(attributes.reachedXBoundary(x, boundsX) && attributes.reachedYBoundary(y, boundsY) ){
        
        return true;
        
    }
    
};
//////////////////////////////////////////////////////////////////////////////////////////////////


//clears the rotation variable if the defender has rotated in a complete circle in either direction
Defender.prototype.checkRotation = function(){
    
    if(this.rotation > this.totalRotation || this.rotation < -this.totalRotation){
       
        this.rotation = 0;
    }
    
};

//turns the defender on 90 degree angles either clockwise or counter-clockwise.
//segmentRotation acts as a keeper of how far the defender should turn in either direction
Defender.prototype.turningCheck = function(sliceOfPi){
 
    if(this.segmentRotation > sliceOfPi || this.segmentRotation < -sliceOfPi){

        this.turning = false;       
        this.segmentRotation = 0;
   
        
    }    
};


//turning motion.  Turns based on which directional button is pressed by the user.
//defender stops moving after movement of 1.57.  Front tip boundary of defender is turned with the
//defender as well.
Defender.prototype.turn = function(){
    
        var movement = (this.vr  *  Math.PI / 180);
        var quarterPI = 1.57;
        
        this.checkRotation();
        
        if(this.turning){
        
            this.rotation += movement; //to radians  
            this.segmentRotation += movement;
            
            this.rotateTheFrontTipBoundary();     
        }
        
        this.turningCheck(quarterPI);

};

//action taken from user input on the keyboard.
//left will make the rotation negative or counter-clockwise
//while right will do the exact opposite.
Defender.prototype.turnOnKeyPress = function(rotation){
    
    this.turning = true;
    this.vr = rotation;
    
};

//moveDefender moves the defender and its front tip detection 
//in the direction based on if it has made a turn or not
Defender.prototype.moveDefender = function(){
    
    this.x += ( Math.cos(this.rotation) * 7 ); 
    this.frontTipX += ( Math.cos(this.rotation) * 7 ); 
    
    this.y += ( Math.sin(this.rotation) * 7 );        
    this.frontTipY += ( Math.sin(this.rotation) * 7 );
   
    
};

Defender.prototype.defenderAttack = function(){
    
    this.x += ( Math.cos(this.rotation) * this.ax ); 
    this.frontTipX += ( Math.cos(this.rotation) * this.ax ); 
    
    this.y += ( Math.sin(this.rotation) * this.ay );        
    this.frontTipY += ( Math.sin(this.rotation) * this.ay );
   
    
};


//rotates the front tip based on the direction that the defender rotates.
//used in the turn method
Defender.prototype.rotateTheFrontTipBoundary = function(){
    
    this.frontTipX = this.x + Math.cos(this.rotation) * 20;
    this.frontTipY = this.y + Math.sin(this.rotation) * 20;
    
};

//stops the defender from moving after it has moved 50 points or pixels across a center cubicle
Defender.prototype.completedCubicleMove = function(){
    
    
    if(this.distanceMoved === 50){
            
        this.moving = false;       
        this.distanceMoved = 0;
        
    }
    
};

//checks if the defender is moving out of the center cubicles.  If it is, this function
//restrains the defender from moving out of the center cubicles.
Defender.prototype.outOfBounds = function(northOrWest, southOrEast){
    
        
    if(this.x < northOrWest && this.moving){
        
        this.moving = false;
        this.x = northOrWest;
        this.frontTipX = (northOrWest - 20);
        this.distanceMoved = 0;
    }
    
    if(this.y < northOrWest && this.moving){
        
        this.moving = false;
        this.y = northOrWest;
        this.frontTipY = (northOrWest - 20);
        this.distanceMoved = 0;
    }
    
    if(this.x > southOrEast && this.moving){
        
        this.moving = false;
        this.x = southOrEast;
        this.frontTipX = (southOrEast + 20);
        this.distanceMoved = 0;
    }
    
    if(this.y > southOrEast && this.moving){
        
        this.moving = false;
        this.y = southOrEast;
        this.frontTipY = (southOrEast + 20);
        this.distanceMoved = 0;
    }
    
};

//stops the defender from moving outside of the designated locations.
Defender.prototype.checkTheBarriers = function(){
  
        var northOrWest = 300;
        var southOrEast = 350;        
        
        this.outOfBounds(northOrWest, southOrEast);
            
};


//moves the defender between center cubicles.
//defender.moving flag is flipped to true by pushing the 'up' (keycode 38) key.
//this method is implemented in the drawFrame function
Defender.prototype.jumpCubicle = function(){
    
     var i = 1;
             
        this.checkTheBarriers();
        
        if(this.moving){
                
            //defender moving on the XY plane depending on its angle
            //distanceMoved keeps track of how far the defender moves across the cubicles.
            this.moveDefender();            
            this.distanceMoved += i;
        
        }
        
        //once the defender's distanceMoved reaches a value of 50, it stops moving and 
        //its distanceMoved variable returns to 0
        this.completedCubicleMove();
    
};


//sets the barriers of the canvas when the defender is attacking.  
Defender.prototype.setCanvasBarriers = function(){
    
    var attributes = new Attributes();
    
    //if the defender hits the right wall
    if(attributes.reachedXBoundary(this.canvas.width, this.frontTipX) 
                
                ||
                
       //if the defender hits the leftWall         
       attributes.reachedXBoundary(0, this.frontTipX)  ){
            
       this.reverseAttack();            
        
    } 

    //if the defender hits the top wall or ceiling of the canvas
    if( attributes.reachedYBoundary(0, this.frontTipY ) 
                
                ||
    //if the defender hits the bottom wall or floor of the canvas            
        attributes.reachedYBoundary(this.canvas.height, this.frontTipY) ){
                                  
        this.reverseAttack(); 
        
    }
};


Defender.prototype.returnToPosition = function(originalX, originalY, originalTipX, originalTipY){
    
    if( this.reachedBothBoundaries(originalX, originalY, this.frontTipX, this.frontTipY) ){
        
        this.x = originalX;        
        this.y = originalY;
        
        this.frontTipX = originalTipX;        
        this.frontTipY = originalTipY;
                  
        this.reverseAttack();
        this.regressing = false;
    }
   
};

//if the attack is true(made active by pressing space), the defender moves out of the barriers
//and attacks the invading pyramids
Defender.prototype.attack = function(){
    
    
    if(this.attacking || this.regressing){
            
            this.defenderAttack();
            this.setCanvasBarriers();
            this.returnToPosition(this.originalX, this.originalY, this.originalTipX, this.originalTipY);
        }
    
};

//condenses all the defender's movements into one method.  The original coordinates are still 
//needed in order to return the defender to it's position prior to attack
Defender.prototype.makeAllMovements = function(){
    
    this.checkAllFlags();
    this.turn();
    this.jumpCubicle();
    this.attack();
    this.draw();
    
};

Defender.prototype.noActivity = function(){
    
     if( !this.attacking && !this.turning && !this.regressing && !this.moving) {
         
         return true;
     }
    
};

//runs the noActivity method 1st.  If the noActivity method returns true, original coordinates are
//set and the attacking flag is flipped true.  Used when the user presses space bar.
Defender.prototype.setOriginalCoordinatesAndAttack = function(){
    
    if(this.noActivity()){
        
        this.originalX = this.x;
        this.originalTipX = this.frontTipX;
        
        this.originalY = this.y;
        this.originalTipY = this.frontTipY;
        
        this.attacking = true;
    }
    
};

//makes a turn on the screen as long as the Defender is not attacking, regressing, or moving
Defender.prototype.makeTurn = function(turnVelocity){
    
    if( !this.attacking && !this.regressing && !this.moving ){
    
        this.turnOnKeyPress(turnVelocity);
                
    } 
    
};

//checks to see whether it is ok to make the defender jump cubicles
Defender.prototype.isClearToJumpCubicle = function(){
    
    if( !this.attacking && !this.turning && !this.regressing){
           
        this.moving = true;
        
    }
    
};

Defender.prototype.checkAllFlags = function(){
    
    this.controls.checkAllFlags();
};

Defender.prototype.makeRightTurnOrRightJump = function(){
    
    this.controls.makeRightTurnOrJumpRight();
    
};

Defender.prototype.makeDownTurnOrDownJump = function(){
    
    this.controls.makeDownTurnOrJumpDown();
    
};

Defender.prototype.makeLeftTurnOrLeftJump = function(){
    
    this.controls.makeLeftTurnOrJumpLeft();
    
};

Defender.prototype.makeUpTurnOrUpJump = function(){
    
    this.controls.makeUpTurnOrJumpUp();
    
};