/* *************************************************************
|
|
|                     FETCH  JS file
|
|     I usually use  js in gulp enviroment,
|     for better development and code organisation. 
|
|         *This file is for data sending and response.
|         
|      
|      My page: https://andrewburw.github.io/personalpage/
|
|
| **************************************************************/

let fetchData = {
  send: function (sendParam, data,route) {

    if (!checkData.notNull(data)) {
       
    
    fetch(`php/api/${route}.php`, {
      method: sendParam,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)

    }).then((response) => response.json())
    .then((data) => {
      

       if (data.status === 'error') {
          console.warn(data)
       } else {
          console.log(data)
          setTimeout(function(){ window.location.reload() }, 500);

       }

    })
    } else {


                  // if forms has emty fields
    return true; // returned value to modal -> call error dialog (true - has errors)

    }

  },
  delete: function (data) {
   
    return this.send('delete', data,'deleteProducts');
  },
  update: function (data) {
 
    return this.send('update', data,'updateProducts');
  },
  recive: function () {
   return fetch(`php/api/showProducts.php`)

  },
  post: function (data) {
    
    return this.send('post', data,'addProduct');
  }


}

let checkData = {
  // functions to check forms data
  notNull: function (params) {
    return !Object.values(params).every(x => (x !== null && x !== ''));
  }
}

