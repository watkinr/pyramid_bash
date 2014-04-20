/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Background(canvas){
    
    this.canvas = canvas;
    this.red =  255;   
    this.green =  255;
    this.blue  =  255;
    this.newRed = 255;
    this.newGreen = 255;
    this.newBlue = 255;
    this.onChange = false;
    this.setInitialBackground();
}


Background.prototype.setInitialBackground = function(){
    
    this.canvas.style.background = "rgb("+ 255 + ","+ 255 +","+ 255 +")" ;
};

Background.prototype.changeTheColors = function(){
    
    if(this.onChange){
      
        this.newRed = Math.floor(Math.random() * 255);
        if(this.newRed < 50){   
            this.newRed += 50;
        } else if(this.newRed > 220){   
                this.newRed -= 50;
            }
        
        
        this.newGreen = Math.floor(Math.random() * 255);
        if(this.newGreen < 50){   
            this.newGreen += 50;
        } else if(this.newGreen > 220){   
            this.newGreen -= 50;
        }
        
        this.newBlue = Math.floor(Math.random() * 255);
        if(this.newBlue < 50){   
            this.newBlue += 50;
        } else if(this.newBlue > 220){   
            this.newBlue -= 50;
        }
        
    }
    
    this.onChange = false;
    
};

Background.prototype.checkRed = function(){
    
    if(this.red < this.newRed){
                      
        this.red +=1;
                             
    }
                     
    if(this.red > this.newRed){
                           
        this.red -=1;
                         
    } 
    
};

Background.prototype.checkGreen = function(){
    

    if(this.green < this.newGreen){
                 
        this.green +=1;
                     
    }
              
    
    if(this.green > this.newGreen){
                 
        this.green -=1;
                        
    }    
    
};

Background.prototype.checkBlue = function(){
    

    if(this.blue < this.newBlue){
                 
        this.blue +=1;
                     
    }
              
    
    if(this.blue > this.newBlue){
                 
        this.blue -=1;
                        
    }    
    
};

Background.prototype.checkAllColors = function(){
  
    this.checkRed();
    this.checkGreen();
    this.checkBlue();
    
    this.canvas.style.background = "rgb("+this.red+","+this.green+","+this.blue+")" ;
};