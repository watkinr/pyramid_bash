/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Grid(){
    
}

//draws the layout of the game grid
Grid.prototype.draw = function(context, canvas, centerX, centerY){
    
        context.beginPath();
////////////////////////////////////////////////////////////////////////////////        
        context.moveTo(centerX, 0);                                             //center vertical line                                 
        context.lineTo(centerX, canvas.height);
        
        context.moveTo( (centerX - 50), 0  );                                   //left vertical line
        context.lineTo( (centerX - 50), canvas.height );
        
        context.moveTo( (centerX + 50), 0  );                                   //right vertical line
        context.lineTo( (centerX + 50), canvas.height );
        
        context.moveTo( 0, (centerY - 50)  );                                   //top horizontal line
        context.lineTo( canvas.width, (centerY - 50) );
        
        context.moveTo( 0, (centerY + 50)  );                                   //bottom horizontal line
        context.lineTo( canvas.width, (centerY + 50) );
        
        context.moveTo(0, centerY);                                             //center horizontal line
        context.lineTo(canvas.width, centerY);
 ///////////////////////////////////////////////////////////////////////////////
        
//left invasion cubicles
/////////////////////////////////////////////////////////////////////////////////        
        context.moveTo(230, (centerY - 50) );
        context.lineTo(230, (centerY + 50) );
        
        context.moveTo(185, (centerY - 50) );
        context.lineTo(185, (centerY + 50) );
        
        context.moveTo(140, (centerY - 50) );
        context.lineTo(140, (centerY + 50) );
        
        context.moveTo(95, (centerY - 50) );
        context.lineTo(95, (centerY + 50) );
        
        context.moveTo(50, (centerY - 50) );
        context.lineTo(50, (centerY + 50) );
        
        context.moveTo(1, (centerY - 50) );
        context.lineTo(1, (centerY + 50) );
        
        context.moveTo(2, (centerY - 50) );
        context.lineTo(2, (centerY + 50) );
        
        context.moveTo(3, (centerY - 50) );
        context.lineTo(3, (centerY + 50) );
        
        context.moveTo(4, (centerY - 50) );
        context.lineTo(4, (centerY + 50) );
        
        context.moveTo(5, (centerY - 50) );
        context.lineTo(5, (centerY + 50) );
///////////////////////////////////////////////////////////////////////////////
        
//right invasion cubicles        
///////////////////////////////////////////////////////////////////////////////        
        context.moveTo(420, (centerY - 50) );
        context.lineTo(420, (centerY + 50) );
        
        context.moveTo(465, (centerY - 50) );
        context.lineTo(465, (centerY + 50) );
        
        context.moveTo(510, (centerY - 50) );
        context.lineTo(510, (centerY + 50) );
        
        context.moveTo(555, (centerY - 50) );
        context.lineTo(555, (centerY + 50) );
        
        context.moveTo(600, (centerY - 50) );
        context.lineTo(600, (centerY + 50) );
        
        context.moveTo(646, (centerY - 50) );
        context.lineTo(646, (centerY + 50) );
        
        context.moveTo(647, (centerY - 50) );
        context.lineTo(647, (centerY + 50) );
        
        context.moveTo(648, (centerY - 50) );
        context.lineTo(648, (centerY + 50) );
        
        context.moveTo(649, (centerY - 50) );
        context.lineTo(649, (centerY + 50) );
        
        context.moveTo(650, (centerY - 50) );
        context.lineTo(650, (centerY + 50) );
///////////////////////////////////////////////////////////////////////////////

//south invasion cubicles
///////////////////////////////////////////////////////////////////////////////        
        context.moveTo( (centerY - 50), 420 );
        context.lineTo( (centerY + 50), 420 );
        
        context.moveTo( (centerY - 50), 465 );
        context.lineTo( (centerY + 50), 465 );
        
        context.moveTo( (centerY - 50), 510 );
        context.lineTo( (centerY + 50), 510 );
        
        context.moveTo( (centerY - 50), 555 );
        context.lineTo( (centerY + 50), 555 );
        
        context.moveTo( (centerY - 50), 600 );
        context.lineTo( (centerY + 50), 600 );
        
        context.moveTo( (centerY - 50), 646 );
        context.lineTo( (centerY + 50), 646 );
        
        context.moveTo( (centerY - 50), 647 );
        context.lineTo( (centerY + 50), 647 );
        
        context.moveTo( (centerY - 50), 648 );
        context.lineTo( (centerY + 50), 648 );
        
        context.moveTo( (centerY - 50), 649 );
        context.lineTo( (centerY + 50), 649 );
        
        context.moveTo( (centerY - 50), 650 );
        context.lineTo( (centerY + 50), 650 );
///////////////////////////////////////////////////////////////////////////////

//north invasion cubicles
///////////////////////////////////////////////////////////////////////////////

        context.moveTo( (centerY - 50), 230 );
        context.lineTo( (centerY + 50), 230 );
        
        context.moveTo( (centerY - 50), 185 );
        context.lineTo( (centerY + 50), 185 );
        
        context.moveTo( (centerY - 50), 140 );
        context.lineTo( (centerY + 50), 140 );
        
        context.moveTo( (centerY - 50), 95 );
        context.lineTo( (centerY + 50), 95 );
        
        context.moveTo( (centerY - 50), 50 );
        context.lineTo( (centerY + 50), 50 );
        
        context.moveTo( (centerY - 50), 1 );
        context.lineTo( (centerY + 50), 1 );
        
        context.moveTo( (centerY - 50), 2 );
        context.lineTo( (centerY + 50), 2 );
        
        context.moveTo( (centerY - 50), 3 );
        context.lineTo( (centerY + 50), 3 );
        
        context.moveTo( (centerY - 50), 4 );
        context.lineTo( (centerY + 50), 4 );
        
        context.moveTo( (centerY - 50), 5 );
        context.lineTo( (centerY + 50), 5 );
///////////////////////////////////////////////////////////////////////////////

        context.stroke();
    
    
};