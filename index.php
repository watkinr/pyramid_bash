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
				
				<?php require_once 'include/gamescripts.php'; ?>
				
				<div style="clear: both;"></div>
			</div>
			<!-- Insert game script here -->
				
			<?php require_once 'include/game_controls.php'; ?>

			<!-- end game script -->			
			<div id="submitHighScore">
				
				<h1>Submit Your High Score at the end of the Game!</h1>
				
				<div id="submitScoreDiv">
					
					
						
						<form action="scores.php" method="REQUEST">
							
													<input id="submitHidden" type="hidden" name="score" value="" />
							
						<h1 id="userheading">Submit Your UserName :	<input type="text" size="30" name="username" />
							
													<input type="submit" value="Enter Score" 
													
													/>
									
						</h1>
													
						</form>
					
					
				</div>
			</div>

		</div>
	</body>
</html>
