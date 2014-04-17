<?php 

Class DatabaseFunctions{
		
		private $userName;
		private $score;
		
		
		//constructor sets username and user score variables
		public function __construct(){
			
			$this->setUserName();
			$this->setScore();
			
		}
		
		//destroys the object once the script has run
		public function __destruct(){
			
		}
		
		//grabs the username from the form on the index page if a user completes a game and submits their score
		//uses real excape string to prevent the database query from going crosseyed
		public function setUserName(){
			
			$userName = mysql_real_escape_string($_REQUEST['username']);
			
			if($userName !== ""){
				
				$this->userName = $userName;
				
			} else {
				
				$this->userName = "blank User";
			}	
					
		}

		public function getUserName(){
			
			return $this->userName;
		}
		

		//same as the setUserName function only with the score
		public function setScore(){

			
			$score = (int) mysql_real_escape_string($_REQUEST['score']);
			
			if($score){
				
				$this->score = $score;
				
			} else{
				
				$this->score = false;
			}
			
		}		
	
		public function getScore(){
			
			return $this->score;
		}
	
		//grab the top 10 usernames from the database
		public function grabTopUsers(){
			
			$query = mysql_query("SELECT USERNAME FROM LOGGED_SCORES ORDER BY SCORE DESC LIMIT 10 ");
			
			$count = 1;
			
			while($result = mysql_fetch_array($query) ){
				
				echo "<li><h2> $count: &nbsp;&nbsp;&nbsp;" . $result[0] . "</h2></li>";
				$count++;
			}
		}
	
		//grab the top 10 scores from the database
		public function grabTopScores(){
			
			$query = mysql_query("SELECT SCORE FROM LOGGED_SCORES ORDER BY SCORE DESC LIMIT 10 ");
			
			while($result = mysql_fetch_array($query) ){
				
				echo "<li><h2> &nbsp;&nbsp;&nbsp;" . $result[0] . "</h2></li>";
			}
		}
	
		//insert a new row of data if the score is something greater than 0;
		public function insertNewDataIfNotEmpty(){
			
			if($this->userName !== ""){
					
					$query = "INSERT INTO LOGGED_SCORES VALUES (NULL, '" . $this->getUserName() . "',  '" . $this->getScore() . 
					"', CURRENT_TIMESTAMP)" ;
					$executeQuery = mysql_query($query);
			}
			
		}
	
	
		public function showUserScore(){
			
			if($this->score > 0){
				
				echo "<h2>Your score : " . $this->getScore() . "</h2><br/>";
				
			}
			
		}
	}



?>
