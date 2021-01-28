<?php
 header('Content-Type: application/json');
require_once 'include/config.php';
require_once 'include/db_connect.php';


class Product {
   public $name;
   public $text;
   public $parentId;
  


 public function __construct($name, $text,$parentId){
     $this->name = $name;
     $this->text = $text;
     $this->parentId = $parentId;
    
 }

  public  function decoder(){
     $content = trim(file_get_contents("php://input")); // get form data

     return $decoded = json_decode($content, true);
  }
}
// ------------------------


// ******************** CONTROLLER ****************
class getFormData extends Product{}   // access to decoder  class method
  $formData = new getFormData(null,null,null,null); // access to decoder  class method
  $formSelected =  $formData->decoder();       // access to decoder  class method

  $db = new Db($config['db']['server'], $config['db']['username'],  $config['db']['password'], $config['db']['dbname']);



$newProduct = new Product($formSelected['name'],$formSelected['text'],$formSelected['parentId']);


//print_r($newProduct );
$db->postData($newProduct);
