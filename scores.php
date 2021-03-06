<?php 	
	require_once 'php_classes/connection.php';
	require_once 'php_classes/database_functions.php';
	
	session_start();
	$submitKey = $_SESSION['submitKey'];

	$connection = new Connection();
	$data = new DatabaseFunctions($submitKey);
	
	$data->insertNewDataIfNotEmpty();

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
<?php session_destroy(); ?>