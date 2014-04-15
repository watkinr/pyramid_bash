/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function SplashLetter(context){
    
    this.context = context;
    this.drawing = true;
    this.setFill();
    this.vertCount = 1;
    this.horzCount = 1;
   ////////////////////////////////////////////////////////////////////////////////
    this.vertX1 = 25;
    this.vertX2 = 125;
    this.vertX3 = 150;
    this.vertX4 = 250;
    this.vertX5 = 275;
    this.vertX6 = 400;
    this.vertX7 = 425;
    this.vertX8 = 550;
    
    this.vertY1 = 175;
    this.vertY2 = 175;
    this.vertY3 = 175;
    this.vertY4 = 175;
    this.vertY5 = 175;
    this.vertY6 = 250;
    this.vertY7 = 175;
    this.vertY8 = 175;
    ////////////////////////////////////////////////////////////////////////////////
    this.horzX1 = 550;
    this.horzX2 = 400;
    this.horzX3 = 400;
    this.horzX4 = 400;
    this.horzX5 = 250;
    this.horzX6 = 250;
    this.horzX7 = 125;
    this.horzX8 = 125;
    this.horzX9 = 125;
    
    this.horzY1 = 250;
    this.horzY2 = 325;
    this.horzY3 = 250;
    this.horzY4 = 175;
    this.horzY5 = 250;
    this.horzY6 = 175;
    this.horzY7 = 325;
    this.horzY8 = 250;
    this.horzY9 = 175;
    
    this.splashPyramids = [];
    this.fillSplashWithPyramids();
}

SplashLetter.prototype.fillSplashWithPyramids = function(){
    
    for(var i = 0; i < 8; i++){
        
        var pyramid = new Pyramid(this.context);
        
        if(pyramid.vector === 1){
            
            pyramid.vector = 0;
        }
        this.splashPyramids.push(pyramid);
        
    }    
};

SplashLetter.prototype.animateSplashPyramid = function(thePyramid){
    
    thePyramid.inflateAndDraw();
};

SplashLetter.prototype.animateThePyramids = function(){
    
    for(var i = 0; i < this.splashPyramids.length; i++){
        
        
        this.animateSplashPyramid(this.splashPyramids[i]);
        
    }
    
};

SplashLetter.prototype.setFill = function(){
    
    this.context.fillStyle = "blue";
    this.context.font = "bold 100px Arial";
                  
};

SplashLetter.prototype.insertText = function(){
    
   // this.context.beginPath();
    this.context.fillText("pyramid", 25, 100);
    this.context.stroke();
};

SplashLetter.prototype.drawVerticalLine = function(){
    
    this.context.beginPath();
  
  switch(this.vertCount){
     
        case 1:
            
            if(this.vertY1 < 325){
         
                this.context.moveTo(this.vertX1, this.vertY1);
                this.vertY1 += 3;
                this.context.lineTo(this.vertX1, this.vertY1); 
            
            } else if(this.vertY1 === 325){
                
                this.vertCount = 2;
            }
        break; 
        
        case 2:
            
            if(this.vertY2 < 325){
         
                this.context.moveTo(this.vertX2, this.vertY2);
                this.vertY2 += 3;
                this.context.lineTo(this.vertX2, this.vertY2); 
            
            } else if(this.vertY2 === 325){
                
                this.vertCount = 3;
            }
        break;
   
        case 3:
            
            if(this.vertY3 < 325){
         
                this.context.moveTo(this.vertX3, this.vertY3);
                this.vertY3 += 3;
                this.context.lineTo(this.vertX3, this.vertY3); 
            
            } else if(this.vertY3 === 325){
                
                this.vertCount = 4;
            }
        break;    
            
        case 4:
            
            if(this.vertY4 < 325){
         
                this.context.moveTo(this.vertX4, this.vertY4);
                this.vertY4 += 3;
                this.context.lineTo(this.vertX4, this.vertY4); 
            
            } else if(this.vertY4 === 325){
                
                this.vertCount = 5;
            }
        break;
        
        case 5:
        
        if(this.vertY5 < 250){
         
                this.context.moveTo(this.vertX5, this.vertY5);
                this.vertY5 += 3;
                this.context.lineTo(this.vertX5, this.vertY5); 
            
            } else if(this.vertY5 === 250){
                
                this.vertCount = 6;
            }
        break;
        
        case 6:
            
            if(this.vertY6 < 325){
         
                this.context.moveTo(this.vertX6, this.vertY6);
                this.vertY6 += 3;
                this.context.lineTo(this.vertX6, this.vertY6); 
            
            } else if(this.vertY6 === 325){
                
                this.vertCount = 7;
            }
                    
        break;
        
        case 7:
            
            if(this.vertY7 < 325){
         
                this.context.moveTo(this.vertX7, this.vertY7);
                this.vertY7 += 2;
                this.context.lineTo(this.vertX7, this.vertY7); 
            
            } else if(this.vertY7 >= 325){
                
                this.vertCount = 8;
            }
            
            break;
    
        case 8:
            
            if(this.vertY8 < 325){
         
                this.context.moveTo(this.vertX8, this.vertY8);
                this.vertY8 += 2;
                this.context.lineTo(this.vertX8, this.vertY8); 
            
            }    
            break;   
  }
  
    
    
    this.context.stroke();
};

SplashLetter.prototype.drawHorzLine = function(){
    
    this.context.beginPath();
    
    switch(this.horzCount){
        
        case 1:
            
            if(this.horzX1 > 425){
                
                this.context.moveTo(this.horzX1, this.horzY1);
                
                this.horzX1 -= 3;
                
                this.context.lineTo(this.horzX1, this.horzY1);
                
            } else if(this.horzX1 <= 425){
              
                this.horzCount = 2;
                
            }
            
            break;
            
        case 2:
        
        if(this.horzX2 > 275){
                
                this.context.moveTo(this.horzX2, this.horzY2);
                
                this.horzX2 -= 3;
                
                this.context.lineTo(this.horzX2, this.horzY2);
                
            } else if(this.horzX2 <= 425){
              
                this.horzCount = 3;
                
            }  
        break;
        
        case 3:
            
            if(this.horzX3 > 275){
                
                this.context.moveTo(this.horzX3, this.horzY3);
                
                this.horzX3 -= 3;
                
                this.context.lineTo(this.horzX3, this.horzY3);
                
            } else if(this.horzX3 <= 425){
              
                this.horzCount = 4;
                
            }
            
            break;
            
        case 4:
            
            if(this.horzX4 > 275){
                
                this.context.moveTo(this.horzX4, this.horzY4);
                
                this.horzX4 -= 3;
                
                this.context.lineTo(this.horzX4, this.horzY4);
                
            } else if(this.horzX4 <= 425){
              
                this.horzCount = 5;
                
            }
            
            break;
            
        case 5:
            
            if(this.horzX5 > 150){
                
                this.context.moveTo(this.horzX5, this.horzY5);
                
                this.horzX5 -= 2;
                
                this.context.lineTo(this.horzX5, this.horzY5);
                
            } else if(this.horzX5 <= 150){
              
                this.horzCount = 6;
                
            }
            
            break;
            
        case 6:
            
            if(this.horzX6 > 150){
                
                this.context.moveTo(this.horzX6, this.horzY6);
                
                this.horzX6 -= 2;
                
                this.context.lineTo(this.horzX6, this.horzY6);
                
            } else if(this.horzX6 <= 150){
              
                this.horzCount = 7;
                
            }
            
            break;
            
        case 7:
            
            if(this.horzX7 > 25){
                
                this.context.moveTo(this.horzX7, this.horzY7);
                
                this.horzX7 -= 2;
                
                this.context.lineTo(this.horzX7, this.horzY7);
                
            } else if(this.horzX7 <= 25){
              
                this.horzCount = 8;
                
            }
            
            break;
            
        case 8:
            
            if(this.horzX8 > 25){
                
                this.context.moveTo(this.horzX8, this.horzY8);
                
                this.horzX8 -= 2;
                
                this.context.lineTo(this.horzX8, this.horzY8);
                
            } else if(this.horzX8 <= 25){
              
                this.horzCount = 9;
                
            }
            
            break;
            
        case 9:
            
            if(this.horzX9 > 25){
                
                this.context.moveTo(this.horzX9, this.horzY9);
                
                this.horzX9 -= 2;
                
                this.context.lineTo(this.horzX9, this.horzY9);
                
            } else if(this.horzX9 >= 25){
                
                this.context.fillText("click to play", 25, 600);
                
            } 
            
        break;
    }
    
    
    this.context.stroke();
};

SplashLetter.prototype.doTheSplash = function(){
    
        this.animateThePyramids();
        this.insertText();
        this.drawVerticalLine();
        this.drawHorzLine();
    
};