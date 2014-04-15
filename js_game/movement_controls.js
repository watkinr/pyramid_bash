/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function MovementControls(theDefender){
    
    this.facingRight = false;
    this.facingLeft = false;
    this.facingUp = false;
    this.facingDown = false;
    this.defender = theDefender;
    
}

//flips facingRight to true if the defender is facing right.  Also sets the rotation to 0.00
MovementControls.prototype.flipRightFlag = function(){
    
    if(this.defender.frontTipX === 320 || this.defender.frontTipX === 370){
        
        this.facingRight = true;
        this.defender.rotation = 0.00;
        
    } else {
        
        this.facingRight = false;
        
    }
    
};

//flips facingLeft to true if the defender is facing left.  Also sets the rotation to 3.1415926535897913;
MovementControls.prototype.flipLeftFlag = function(){
    
    if(this.defender.frontTipX === 280 || this.defender.frontTipX === 330){
        
        this.facingLeft = true;
        this.defender.rotation = 3.1415926535897913;
        
    } else {
        
        this.facingLeft = false;
        
    }
    
};

//flips facingUp to true if the defender is facing up.  Also sets the rotation to 4.712388980384686;
MovementControls.prototype.flipUpFlag = function(){
    
    if(this.defender.frontTipY === 280 || this.defender.frontTipY === 330){
        
        this.facingUp = true;
        this.defender.rotation = 4.712388980384686;
        
    } else {
        
        this.facingUp = false;
        
    }
    
};


//flips facingDown to true if the defender is facing down.  Also sets the rotation to 1.5707963267948966;
MovementControls.prototype.flipDownFlag = function(){
    
    if(this.defender.frontTipY === 320 || this.defender.frontTipY === 370){
        
        this.facingDown = true;
        this.defender.rotation = 1.5707963267948966;
        
    } else {
        
        this.facingDown = false;
        
    }
    
}; 

//checks all the flags to see which direction the defender is facing.  Used in defender's
//makeAllMovements method
MovementControls.prototype.checkAllFlags = function(){
    
    this.flipRightFlag();
    this.flipUpFlag();
    this.flipLeftFlag();
    this.flipDownFlag();
    
};

//easy and dynamic way to make movements from defender more convenient and easy for user to use.
//all movements are designed so that the defender makes no more than 2 turns to point in the desired
//direction.  If it is pointing in the desired direction and that key is pressed 
//(EX facingRight is true and defender is pushed right, it will jump 1 cubicle to the right.
//all these methods are used by the defender.  The methods are at the bottom of the defender object.
MovementControls.prototype.makeRightTurnOrJumpRight = function(){
    
    if(!this.facingRight && this.facingDown){
        
        this.facingDown = false;
        this.facingLeft = false;
        this.facingUp = false; 
        
        this.defender.makeTurn(-5);
        
    }   else if(!this.facingRight){
        
        this.facingDown = false;
        this.facingLeft = false;
        this.facingUp = false; 
        
        this.defender.makeTurn(5);
          
    
    } else {
        
        this.defender.isClearToJumpCubicle();
        
    }
    
};

MovementControls.prototype.makeDownTurnOrJumpDown = function(){
    
    if(!this.facingDown && this.facingLeft){
        
        this.facingLeft = false;
        this.facingUp = false; 
        this.facingRight = false;
        
        this.defender.makeTurn(-5);
        
    } else if(!this.facingDown){
             
        this.facingLeft = false;
        this.facingUp = false; 
        this.facingRight = false;
        
        this.defender.makeTurn(5);
             
    }  
    
    else {
        
        this.defender.isClearToJumpCubicle();
        
    }
    
};

MovementControls.prototype.makeLeftTurnOrJumpLeft = function(){
    
    if(!this.facingLeft && this.facingDown){
        
        this.facingUp = false; 
        this.facingRight = false;
        this.facingDown = false;
        
        this.defender.makeTurn(5);
        
    } else if(!this.facingLeft){
                
        this.facingUp = false; 
        this.facingRight = false;
        this.facingDown = false;
        
        this.defender.makeTurn(-5);
          
    
    } else {
        
        this.defender.isClearToJumpCubicle();
        
    }
    
};

MovementControls.prototype.makeUpTurnOrJumpUp = function(){
    
    if(!this.facingUp && this.facingLeft){
        
        this.facingRight = false;
        this.facingDown = false;
        this.facingLeft = false; 
    
        this.defender.makeTurn(5);
        
    }   else if(!this.facingUp){
                
        this.facingRight = false;
        this.facingDown = false;
        this.facingLeft = false; 
    
        this.defender.makeTurn(-5);
          
    
    } else {
        
        this.defender.isClearToJumpCubicle();
        
    }
    
};