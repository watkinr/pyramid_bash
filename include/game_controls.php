<script>
        
    window.onload = function () {
      var canvas = document.getElementById('canvas'),	  
          mouse = utils.captureMouse(canvas),      
          context = canvas.getContext('2d');
  
          var game = new Game(canvas, context);
        
                  
        canvas.addEventListener('mousedown', function () {
            
            game.start();
                     
        }, false);          
                  
/////////////////////////////////////////////////////////////////////////////////////////////////             
/////////////////////////////////////////////////////////////////////////////////////////////////             

        window.addEventListener('keydown', function (event) {
        
        //prevents the keyboard from scrolling the page in the event that the user 
        //has the page zoomed in.
        if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    
        }
        
        switch(event.keyCode){
                       
            case 32:// space
                
                game.defenderAttackMovements();
                    
                break;      
                  
            case 37://left
                 
                game.defenderleftTurnOrJump();

                break;
            
            case 38://up
                
                game.defenderUpTurnOrJump();
     
                break;
                
            case 39://right
                
                
                game.defenderRightTurnOrJump();
                
                break;
                
            case 40://down
            
                game.defenderDownTurnOrJump();
            
                break;
                
            
              }
              
          }, false);
         
       window.addEventListener('keyup', function (event) {
       

      
    }, false);
    
    

      (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);
        
        if(game.gameIsActive){
       
            context.clearRect(0, 0, canvas.width, canvas.height); 
          
            game.gameActivity(game.defender);
                  
        } else if(game.activatedGameOver){
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            game.runGameOverScreen();
            
            
            if(!hideStuffIfSubmitted){
            	
            	document.getElementById("submitHidden").value = game.score;
           	    document.getElementById("userheading").style.visibility="visible";
            	
            }  else {
            	
            	hideEverything();
            	
            }
            
            
            game.resetAll();
            
        }
        
        
        else {
            
            game.splashScreen();
                
        }
                 
      }());
    };
    </script>