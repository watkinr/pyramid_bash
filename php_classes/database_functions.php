<?php 

Class DatabaseFunctions{
		
		private $userName;
		private $score;
		private $sessionKey;
		
		//constructor sets username and user score variables
		public function __construct($theSessionKey){
			
			$this->setSessionKey($theSessionKey);
			
			if($this->checkTheKeys($theSessionKey) && $_POST['submitted']=="submitted"){
				
				$this->setUserName();
				$this->setScore();
				
			}	
		}
		
		//destroys the object once the script has run
		public function __destruct(){
			
		}
		
		//setSessionKey grabs the session key to make sure that they match.  If they don't, no protocols are
		//run on the database to prevent SQL injection and CSRF attacks.
		
		public function setSessionKey($theSessionKey){
			
			$this->sessionKey = $theSessionKey;
		}
		
		public function checkTheKeys($theSessionKey){
			
			if($theSessionKey===$this->sessionKey){
				
				if(isset($_POST['submitted'])){
					
				//	echo "true";
					return true;
					
				}
				
				//echo"Post is not set";
				
					return false;
			} else {
				
				//echo "the keys do not match";
				return false;
			}
			
		}
		
		//grabs the username from the form on the index page if a user completes a game and submits their score
		//uses real excape string to prevent the database query from going crosseyed
		public function setUserName(){
			
			if(isset($_POST['submitted'] )  ){
				
				if(preg_match('%^[A-Za-z0-9_-]2,30}$%', $_POST['username']) ){
					
					$userName = mysql_real_escape_string($_POST['username']);
					
					if($userName !== ""){
				
						$this->userName = $userName;
				
					} else {
					
						$this->userName = "blank_user";
			
					}
					//if the user enters a string that is not valid according to the regular expressions
				} else {
					
					$this->userName = "failed_entry";
				}
				
			}	
					
		}

		public function getUserName(){
			
			return $this->userName;
		}
		

		//same as the setUserName function only with the score
		public function setScore(){

			if(isset($_POST['submitted'] )  ){
					
				if(preg_match('%^[0-9]{1,5}$%', $_POST['score'] ) ){
					
					$score = (int) mysql_real_escape_string($_POST['score']);
					
					if($score){
				
						$this->score = $score;
				
					} else {
				
						$this->score = 0;
			
					}	
					//if the regular expression match for the score fails.  The max score is set at 5 digits to prevent an un-authorized
					//code injection
				} else {
					$this->score = 0;
				}
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
	
		//insert a new row of data if the score is something greater than 0.  The values are entered in reverse to prevent any type
		//of SQL injection
		public function insertNewDataIfNotEmpty(){
			
			if($this->score > 0){
					
					$query = "INSERT INTO LOGGED_SCORES (ENTERED_ON, SCORE, USERNAME, ID) VALUES (CURRENT_TIMESTAMP, '" . $this->getScore() . "',  '" . $this->getUserName() . 
					"', NULL)" ;
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
