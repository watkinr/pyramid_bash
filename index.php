<?php  

session_start();
$_SESSION['submitKey'] = md5(uniqid()); 

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Welcome to Pyramid Bash!</title>
		<link rel="stylesheet" href="include/style.css">
	</head>

	<body>
		<div id="mainContainer">			
			
			<div id="menuAndOtherStuff">
				
				<div id="menu">
					<?php require_once 'include/menu.php'; ?>
				</div>
				
				<canvas id="canvas" width="650" height="650"></canvas>
				
				<div style="clear: both;"></div>
			</div>
			<!-- Insert game script here -->
		<script src="js_game/utils.js"></script>
		<script src="js_game/splashLetter.js"></script>
		<script src="js_game/gameOver.js"></script>
		<script src="js_game/pyramid.js"></script>
		<script src="js_game/defender.js"></script>
		<script src="js_game/grid.js"></script>
		<script src="js_game/vector.js"></script>
		<script src="js_game/game.js"></script>
		<script src="js_game/attributes.js"></script>
		<script src="js_game/movement_controls.js"></script>
				
		<?php require_once'include/game_controls.php'; ?>
			<!-- end game script -->			
			<div id="submitHighScore">
				
				<h1>Submit Your High Score at the end of the Game!</h1>
				
				<div id="submitScoreDiv">
					
					
						
						<form action="scores.php" method="POST">
							
													
							
						<h1 id="userheading">Submit Your UserName :	<input type="text" id="usernameText" size="30" name="username" /></h1>
																	<input type="hidden" id="scoreText" name="score"  />
																	<input type="hidden" name="submitted" value="submitted" />
						<h1 id="userScore"></h1>
						<input type="submit" id="submitButton" onclick="flipHideFlag()" value="Enter Score"/>						
						
						</form>
					
			<script type="text/javascript">
		//minor script to hide user input when/if they submit a form
		
		
		
		var hideStuffIfSubmitted = false;
		
		function flipHideFlag(){
			hideStuffIfSubmitted = true;
			console.log("flag : " + hideStuffIfSubmitted);
		}
		
		function hideEverything() { 
					 document.getElementById("submitScoreDiv").visibility="hidden";
				   	 document.getElementById("usernameText").visibility="hidden";
				   	 document.getElementById("submitButton").visibility="hidden";
				   	 document.getElementById("userheading").visibility="hidden";
		} ;	
	</script>
					
					
				</div>
				
			</div>
		</div>
	</body>
</html>


