<?php
try {
	return new PDO(
	    'mysql:host=localhost;dbname=fernandomuellerbd', 
	    'fernandomuellerbd', 
	    'senhasegura', 
	    [
	        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
	        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
	    ]
	);
} catch (PDOException $e) {
	die($e->getMessage());
}