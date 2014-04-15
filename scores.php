<?php 	
	require_once 'php_classes/connection.php';
	require_once 'php_classes/database_functions.php';

	$connection = new Connection();
	$data = new DatabaseFunctions();
	$data->insertNewDataIfNotEmpty();

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
	
		<title>Welcome to Pyramid Bash!</title>
		<link rel="stylesheet" href="include/style.css">

	</head>
	
	<script>
		//minor script to hide user input when/if they submit a form
		function() { document.getElementById("submitScoreDiv").visibility="hidden";  } ();		
	</script>
	

	<body>
		<div id="mainContainer">			
			
			<div id="menuAndOtherStuff">
				
				<div id="menu">
					<?php require_once 'include/menu.php'; ?>
				</div>
				
				<div id="gamePlayAndScores">
					
					<h1>Top Bashers</h1>
					
					<ul id="userList">
						
						<?php $data->grabTopUsers();  ?>
						
					</ul>
					
					<ul id="userScores">
						
						<?php $data->grabTopScores(); ?>
						<?php $data->showUserScore(); ?>
						
						
					</ul>
				
					<div style="clear: both;"></div>	
				</div>
				<div style="clear: both;"></div>
			</div>

		</div>
	</body>
</html>