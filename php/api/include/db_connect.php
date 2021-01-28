<?php
/* *************************************************************
|
|
|                      DB file
|     
|
|         *This file is db Class.
|         *This db class is for db interaction.
|      
|      My page: https://andrewburw.github.io/personalpage/
|
|
| **************************************************************/




class Db
{
  protected $connection;
  protected $query;

  public function __construct($dbhost = 'localhost', $dbuser = 'root', $dbpass = '', $dbname = '', $charset = 'utf8')
  {
    $this->connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    if ($this->connection->connect_error) {
      //    $this->error('Failed to connect to MySQL - ' . $this->connection->connect_error);
      exit();
    }
  }



  public function postData($formData)
  {
    // ----- POST DATA TO TABLE ------
    //print_r($formData);
    $tableColums = implode(",", array_keys(get_object_vars($formData)));
    $formValues  = array_values(get_object_vars($formData));
    $generateArray = array_fill(0, count($formValues), '?');
    $insertParametrsString = implode(',', $generateArray);
    $bindParamTypes = str_repeat("s", count($formValues));

    $sqlString = "INSERT INTO products ($tableColums) VAlUES ($insertParametrsString)";
    $test = $this->connection->prepare($sqlString);
    $test->bind_param($bindParamTypes, ...$formValues);
    //  if(!$test->execute()){
    //      echo mysqli_error( $this->connection);
    //  }

    if ($test->execute()) {

      echo  json_encode(array("status" => 'OK'));
    } else {

      echo   json_encode(array("status" => 'error', "error" => $this->connection->error));
    }

    $this->connection->close();
  }

  public function getData()
  {
    // -----  SHOW PRODUCTS ------


    $sqlQuery = "SELECT * FROM products;";

    $result = $this->connection->query($sqlQuery);

    if ($result) {
      $data_array = array();

      while ($rows = mysqli_fetch_assoc($result)) {

        $data_array[] = $rows;
      }
      return  $data_array;
    } else {

      $errorN = mysqli_errno($this->connection);
      if (array_key_exists($errorN, $this->sqlErrors)) {
        echo  json_encode(array("status" => 'error', "error" => $this->sqlErrors[$errorN]));
      } else {
        echo   json_encode(array("status" => 'error', "error" => $this->connection->error));
      }
    }



    $this->connection->close();
  }

  public function deleteData($ids)
  {
    // -----  DELETE PRODUCTS ------
    // there is not check SQL-Injection becourse in delete form no input fields

    $sqlQuery = "DELETE from `products` WHERE `products`.`parentId` = $ids ;";
    $sqlQuery2 = "DELETE from `products` WHERE `products`.`id` = $ids ;";
    if ($this->connection->query($sqlQuery) && $this->connection->query($sqlQuery2)) {

      echo  json_encode(array("status" => 'OK'));
    } else {

      echo   json_encode(array("status" => 'error', "error" => $this->connection->error));
    }

    $this->connection->close();
  }
  public function updateData($data)
  {
/* ***********************************************************
|
|                      UPDATE FUNCTION 
|
| ************************************************************   */

    $query = "UPDATE products SET name=? ,text=? WHERE id=?";
    $stmt = $this->connection->prepare($query);



    $val1 = $data['name'];
    $val2 = $data['text'];
    $val3 = $data['id'];

    $stmt->bind_param("sss", $val1, $val2, $val3);



    if ($stmt->execute()) {

      echo  json_encode(array("status" => 'OK'));
    } else {

      echo   json_encode(array("status" => 'error', "error" => $this->connection->error));
    }

    $this->connection->close();
  }

  public function loginUser($data)
  {
    /* ***********************************************************
|
|                      LOGIN FUNCTION 
|
| ************************************************************   */

    // Check if username is empty


    if (empty(trim($data['username']))) {
      echo  json_encode(array("status" => 'error', "error" => 'empty user name'));
    } else {
      $username = trim($data['username']);
    }

    // Check if password is empty
    if (empty(trim($data['pass']))) {
      echo  json_encode(array("status" => 'error', "error" => 'empty user pass'));
    } else {
      $password = trim($data['pass']);
    }

    if (empty($username_err) && empty($password_err)) {
      // Prepare a select statement
      $sql = "SELECT id, username, password FROM user WHERE username = ?";

      $stmt = $this->connection->prepare($sql);
      // echo  json_encode(array("status" => 'error', "error" => $username));
      $stmt->bind_param("s", $username);


      if (mysqli_stmt_execute($stmt)) {
        // Store result
        mysqli_stmt_store_result($stmt);

        // Check if username exists, if yes then verify password
        if (mysqli_stmt_num_rows($stmt) == 1) {

          mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
          if (mysqli_stmt_fetch($stmt)) {
            if (password_verify($password, $hashed_password)) {
              // Password is correct, so start a new session
              session_start();

              // Store data in session variables
              $_SESSION["loggedin"] = true;
              $_SESSION["id"] = $id;
              $_SESSION["username"] = $username;


              //header('Location: http://localhost/products.php');
              echo  json_encode(array("status" => 'ok', "error" => "done"));
            } else {
              // Display an error message if password is not valid
              echo  json_encode(array("status" => 'error', "error" => "The password you entered was not valid."));
            }
          }
        } else {
          // Display an error message if username doesn't exist
          echo  json_encode(array("status" => 'error', "error" => "No account found with that username."));
        }
      }
    }

    $this->connection->close();
  }
}
