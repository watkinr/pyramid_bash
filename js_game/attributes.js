/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Attributes(){
    
  this.colorSelector = Math.floor(Math.random() * 4);       //selects the number-color coordination for selectTheColor function
  this.color = this.selectColor(this.colorSelector);     //sets defender's color
    
}

Attributes.prototype.selectColor = function(colorSelector){
    
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


///////////////////////////////////////////////////////////////////////////////////////////
//reachedXBoundary and reachYBoundary are used for bot the defender and pyramid objects.  
//The defender uses these 2 methods to calculate when the defender hits the canvas wall.
//These methods are used by the pyramids to signify when the defender hits the pyramids.
Attributes.prototype.reachedXBoundary = function(x, boundsX){
    
    if(  x > (boundsX - 20)  &&   x < (boundsX + 20)   ){
        
        return true;
        
    }
    
};

Attributes.prototype.reachedYBoundary = function(y, boundsY){
    
    if(  y > (boundsY - 20)  &&   y < (boundsY + 20)   ){
        
        return true;
        
    }
    
};