<?php
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header('Location: http://localhost/index.php');
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products</title>
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/responsible.css" />
</head>

<body>
  <main>
 
  <section class="page__section">
    <div class="container">
      <div class="main__inner">
        <div class="main__inner-container">
          <div class="main__logo">
            <img src="images/big-logo.png" height="150" alt="Logo" />
          </div>
          <h1 class="main__title">Products</h1>
          <div class="main-lists-container">
            <ul class="tree">
           


            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
  <script src="js/ablib.js"></script>
  <script src="js/plugins/modal_plugin.js"></script>
  <script src="js/plugins/fetchData.js"></script>
  <script src="js/main.js"></script>
  
 
</body>

</html>