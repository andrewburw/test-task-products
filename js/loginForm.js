/* *************************************************************
|
|
|                      Login.js file
|
|     I usually use for plain js  gulp enviroment,
|     for better development and code organisation. 
|
|      In this file is for login fom.
|      
|      More info: https://andrewburw.github.io/personalpage/
|
|
| **************************************************************/

/* *********************************************************
|
|                   INDEX.html FORM CHECKER
|
* ********************************************************* */

let formControl = {
     
    loginUser: function(e) {
        let data = {
            username: $('#name').val(),
            pass: $('#pass1').val()
        }
       
       
      let check =  !Object.values(this.checkLoginData(data)).every(x => (x !== false));


      if (check) {
          this.sendData(data)
      }
  
    },
    formDialog:function(params) {
        // * dialog control
        if (params === 'show_dialog') {
            $('.main_form-errdialog').show();
            $('#login_name').show();
        }
        if (params === 'hide_dialog') {
            $('.main_form-errdialog').hide();
            $('#login_name').hide();
        }
        if (params === 'show_pass_dialog') {
            $('#login_pass').show();
        }
        if (params === 'hide_pass_dialog') {
            $('#login_pass').hide();
        }
        if (params === 'all') {
            $('.main_form-errdialog').show();
            $('#login_name').show();

        }

    },
    checkLoginData: function(params) {
        // * simple check forms
        // * there is more elegant way to check forms data
        // * for faster development this part is a little spagheti code
          
       let regex = /^[a-z][a-z]+\d*$|^[a-z]\d{2,}$/i;
       let testResult = regex.test(params.username);
       let hasErrors = {login:true,pass: true};
      


        if (!testResult) {
            this.formDialog('show_dialog');
            hasErrors.login = true;
        } else {
           
            this.formDialog('hide_dialog');
            hasErrors.login = false;
        }

        if (params.pass.length === 0) {
            this.formDialog('show_pass_dialog');
            hasErrors.login = true;
        
        } else {
          
            this.formDialog('hide_pass_dialog');
            hasErrors.login = false;
        }

      return hasErrors;

    },
    sendData: function(params) {
      
       
    
            fetch(`php/api/login.php`, {
              method: 'post',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(params)
        
            }).then((response) => response.json())
            .then((data) => {
              
        
               if (data.status === 'error') {
                  console.warn(data)
                  this.formDialog('all')
               } else {
                //  console.log(data)
                  setTimeout(function(){ window.location.reload() }, 500);
        
               }
        
            })
            } 
    
  
  
  }



