<?php
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header('Location: http://localhost/products.php');
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/main.css" />
    <link rel="stylesheet" href="css/responsible.css" />
    <title>Products</title>
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
            <h4 class="main__sub-title">Please Login</h4>
            <div class="main__form-container">
              <form onsubmit="return false">
                <div class="main__form-group">
                  <label for="name">NAME</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter name"
                    maxlength="10"
                  />
                  <small id="login_name" class="hide" style="color: red;">Error in field.</small
                  >
                </div>
                <div class="main__form-group">
                  <label for="pass1">PSSWORD</label>
                  <input
                    type="password"
                    class="form-control"
                    id="pass1"
                    placeholder="Enter password"
                  />
                  <small id="login_pass" class="hide" style="color: red;">Can't be blank.</small>
                </div>
                <div class="main_form-errdialog hide">

                  <h1>Error!</h1>
                  <ul>
                    <li>Name to 2 letters (or more) and zero or more numbers</li>
                    <li>Name 1 letter and 2 or more numbers</li>
                 
                    <li>Or user does not exists</li>
                  </ul>
                </div>
                <div class="main__form-g-button">
                  <button class="main_form_submit" onclick="formControl.loginUser(this)" >Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
    <script src="js/ablib.js"></script>
    <script src="js/plugins/fetchData.js"></script>
    <script src="js/loginForm.js"></script>
   
  </body>
</html>
