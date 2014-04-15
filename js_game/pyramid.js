/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Pyramid (context) {
  this.size = 0;                                          //size of the pyramid.  Inflates to max-size of 15
  this.distanceMoved = 0;                                 //used to track the pyramids distance moved from square to square.
  this.context = context;                                 //absorbs the canvas context
  this.vector = Math.floor(Math.random() * 8);            //selects which vector the pyramid will be invading from
  this.colorSelector = Math.floor(Math.random() * 4);     //selects the number-color coordination for selectTheColor function
  this.color = this.selectTheColor(this.colorSelector);   //color that the pyramid adopts
  this.rotation = 0;                                      //used to rotate the pyramid
  this.isAdvancing = false;                               //flips to true to advance the pyramid.  Used in moveForward function
  this.isDefeated = false;                                //flips to true when the defender color & invader colors match and objects collide
  this.isActive = false;                                  //flips to true in the vector object.  When true, pyramid is drawn and fully functional
}

//selects the pyramid's fill color at random.  The switch and case determines what
//color is determined based on colorSelector's value.
Pyramid.prototype.selectTheColor = function(colorSelector){
    
    var theColor = "";
    
    switch(colorSelector){
        
        case 0:
            
            theColor = "#FF0000";
            break;
        
        case 1:
            
            theColor = "#00FF00";
            break;
            
        case 2:
        
            theColor = "#0000FF";
            break;
            
        case 3:
        
            theColor = "#FFFF00";
            break;     
    }
    
    return theColor;
    
};

//sets the vector and the amount of rotation on the pyramid when it is initially created.
//this method is used in the 1st portion of the if-statement in inflateAndDraw method.
Pyramid.prototype.setVectorAndRotation = function(){
    
    switch(this.vector){
        
        case 0 :
            
            this.rotation = 0.00;
            this.x = 30;
            this.y = 350;
            break;
        
        case 1 :
            
            this.rotation = 0.00;
            this.x = 30;
            this.y = 300;
            break;

        case 2 :
            
            this.rotation = 1.57;
            this.x = 300;
            this.y = 30;
            break;

        case 3 :
            
            this.rotation = 1.57;
            this.x = 350;
            this.y = 30;
            break;

        case 4:
            
            this.rotation = 3.14;
            this.x = 620;
            this.y = 300;
            break;

        case 5:
            
            this.rotation = 3.14;
            this.x = 620;
            this.y = 350;
            break;

        case 6 :
            
            this.rotation = 4.71;
            this.x = 350;
            this.y = 620;
            break;

        case 7 :
            
            this.rotation = 4.71;
            this.x = 300;
            this.y = 620;
            break;
    }
    
};

//draws the path of the pyramid.  The path equates to an equilateral triangle
Pyramid.prototype.draw = function (size) {
  this.context.beginPath();
  this.context.moveTo(-size, 0);
  this.context.lineTo(-size, -size);
  this.context.lineTo(size, 0);
  this.context.lineTo(-size, size);
  this.context.lineTo(-size, 0);
  this.context.closePath();
  this.context.fill();
  this.context.stroke();
  
  this.context.restore();
};

//inflates the pyramid to a total size of 15 px.  When size has reached 15px, the pyramid stays at the
//permanent size
Pyramid.prototype.inflateAndDraw = function(){
    
  this.context.save();
  this.context.translate(this.x, this.y);
  
  this.context.rotate(this.rotation);
   
  this.context.lineWidth = 1;
  this.context.fillStyle = this.color;
    
  if(this.size < 16){
      
        this.draw(this.size);
        this.size += 2;
        this.setVectorAndRotation();
  
    } else {     
    
        this.draw(15);
    
    }     
};


Pyramid.prototype.collidesWithDefender = function(theDefender){
    
    var attributes = new Attributes();
    
    if(attributes.reachedXBoundary(theDefender.frontTipX, this.x) && attributes.reachedYBoundary(theDefender.frontTipY, this.y) ){
             
        this.checkColors(theDefender);
        
    } 
};
////////////////////////////////////////////////////////////////////////////////
//checkColors is probably the messiest method so far.
//the initial if statement checks to see if the colors of the defender and the invading pyramid match
//if they do, the defender knocks the pyramid off the board and keeps going.
//within the else statement, the game checks to see if the defender's attacking flag is still active
//(which in this case it will be).  The game then swaps the color values between and reverses the 
//defender's velocity so it is going backward.  In doing so, reverseVelocities() also flips
//the defender's attacking flag to false so the defender never gets stuck in a bug with the 
//invading pyramid.
Pyramid.prototype.checkColors = function(theDefender){
    
    if(theDefender.color === this.color){
        
        this.isDefeated = true;
        //this.killPyramid();
        
    } else {
         
            if(theDefender.attacking){
                
                var temp = theDefender.color;
                theDefender.color = this.color;
                this.color = temp;
                
                theDefender.reverseAttack();
            }
            
    }
    
};
////////////////////////////////////////////////////////////////////////////////
//This method is called when the color of the defender and the invader pyramids match.
//depending on which vector the pyramids are killed from, they spin off the screen to the nearest corner
//Example: vector 0 (bottom left vector): pyramids spin to the bottom left corner.
Pyramid.prototype.killPyramid = function(){
    
    if(this.isDefeated){
         
        switch(this.vector){
            
            case 0:
                              
                this.x -= 10;
                this.y += 10;       
                
                this.frontTipX -= 10;
                this.frontTipY += 10;
            
                break; 
            
            
            case 1:
             
               
                this.x -= 10;
                this.y -= 10;
        
                this.frontTipX -= 10;
                this.frontTipY -= 10;
                
                break;
                
            case 2:
             
               
                this.x -= 10;
                this.y -= 10;
        
                this.frontTipX -= 10;
                this.frontTipY -= 10;
                
                break;    
                
            case 3:
                         
               
                this.x += 10;
                this.y -= 10;
        
                this.frontTipX += 10;
                this.frontTipY -= 10;
                
                break;
                
           case 4:
                         
               
                this.x += 10;
                this.y -= 10;
        
                this.frontTipX += 10;
                this.frontTipY -= 10;
                
                break;     
                
            case 5:
                              
                this.x += 10;
                this.y += 10;       
                
                this.frontTipX += 10;
                this.frontTipY += 10;
            
                break;
            
            case 6:
                              
                this.x += 10;
                this.y += 10;       
                
                this.frontTipX += 10;
                this.frontTipY += 10;
            
                break;
                
           case 7:
                              
                this.x -= 10;
                this.y += 10;       
                
                this.frontTipX -= 10;
                this.frontTipY += 10;
            
                break;     
        }

        this.rotation += 10;
        
    }
    
};

//checks to see if the pyramid has made a full cubicle move
Pyramid.prototype.checkForFullMove = function(){
    
    if(this.distanceMoved === 45){
 
        this.isAdvancing = false;
        this.distanceMoved = 0;
    }
    
};

//moves the pyramid and its front tip object forward
Pyramid.prototype.moveForward = function(){
    
    if(this.isAdvancing){
        
        this.x += ( Math.cos(this.rotation) * 3 );
        this.y += ( Math.sin(this.rotation) * 3 );
        
        this.frontTipX += (Math.cos (this.rotation) * 3 );
        this.frontTipY += (Math.sin (this.rotation) * 3 );
        
        this.distanceMoved += 3;
    }
    
    this.checkForFullMove();
    this.killPyramid();
    
};

//rotates pyramid to correct angle according to its vector
Pyramid.prototype.turn = function(theRotation){
    
    
    this.rotation += theRotation;
};


//puts all the movement and collision methods into one simple method
//pyramids are active when the isActive flag is flipped in the vector object
Pyramid.prototype.makeAllMovements = function(theDefender){
    
        if(this.isActive){
           
           this.inflateAndDraw();
           this.moveForward();
           this.collidesWithDefender(theDefender);
        
        }
        

};

//checks to see if the pyramid has been knocked off the screen.  If it is, then the pyramid's
//original characteristics are completely reset
Pyramid.prototype.isOffTheScreen = function(){
    
  if(this.x < 0 || this.x > 700 || this.y < 0 || this.y > 700){
      
      this.size = 0;
      this.colorSelector = Math.floor(Math.random() * 4);
      this.color = this.selectTheColor(this.colorSelector);
      this.rotation = 0;
      this.isAdvancing = false;
      this.isDefeated = false;
      this.isActive = false;
      
      return true;
      
  }  
    
};

