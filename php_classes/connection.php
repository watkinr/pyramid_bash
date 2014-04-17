<?php

DEFINE('DBUSER', 'root');
DEFINE('DBPASS', 'g0disan4sshole');
DEFINE('DBHOST', 'localhost');
DEFINE('DBNAME', 'PYRAMID_BASH');

	Class Connection{
		
		private $connection;
		
		public function __construct(){
		
			$this->connectToMySQL();
			$this->selectTheDB();
			
		}
		
		public function __destruct(){
			
			$this->closeConnection();
			
		}
		

		private function connectToMySQL(){
			
			$this->connection = mysql_connect(DBHOST, DBUSER, DBPASS);
			
			if(!$this->connection){
				
				die("error connecting to MySQL database at " . mysql_error() );				
			}			
		}
		
		
		private function selectTheDB(){
			
			$selectDB = mysql_select_db(DBNAME);
			
			if(!$selectDB){
		
			die("error connecting to database");
	
			} else{
	
			//echo "connected to the video store <br/>";	

			}
			
		}
		
		function closeConnection(){
			
			if($this->connection){
				
				mysql_close($this->connection);
				//echo "<h1>The connection has been closed </h1><br/>";
			}
			
		}
		
		
	}


?>
