<?php
/* *************************************************************
|
|
|                      Update file
|     
|
|         *This file is route for update data.
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




  function decoder(){
    $content = trim(file_get_contents("php://input"));
     return $decoded = json_decode($content, true);

  }




$db->updateData(decoder());
