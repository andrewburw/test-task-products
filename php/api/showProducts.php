<?php
/* *************************************************************
|
|
|                     Show Products file
|     
|
|         *This file is route for show data.
|       
|      
|      My page: https://andrewburw.github.io/personalpage/
|
|
| **************************************************************/
require_once 'include/config.php';
require_once 'include/db_connect.php';


 header('Content-Type: application/json');



$db = new Db($config['db']['server'], $config['db']['username'],  $config['db']['password'], $config['db']['dbname']);



$dbData = $db->getData(); // get data form DB

 echo json_encode($dbData);
