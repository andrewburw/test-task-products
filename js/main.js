/* *************************************************************
|
|
|                      Main JS file
|
|     I usually use plain js in gulp enviroment,
|     for better development and code organisation. 
|
|         *This file is main for app.
|         *In this file is Algorythm who generates al list tree structure +
|         *In TREE control function is control for show or hide child tree nodes.
|      
|      My page: https://andrewburw.github.io/personalpage/
|
|
| **************************************************************/
fetchData.recive().then((response) => response.json())
// auto fetch on page load.Recive data then-> render
.then((data) => {
    

   if (data.status === 'error') {
    
   } else {
   
    treeControl.renderData(data);
    
  
   }

}).then(()=>{
    // ***********************************
    // TREE control function
    var tree = document.querySelectorAll('ul.tree a:not(:last-child)');
    for(var i = 0; i < tree.length; i++){
        tree[i].addEventListener('click', function(e) {
            var parent = e.target.parentElement;
            var classList = parent.classList;
            if(classList.contains("open")) {
                classList.remove('open');
                var opensubs = parent.querySelectorAll(':scope .open');
                for(var i = 0; i < opensubs.length; i++){
                    opensubs[i].classList.remove('open');
                }
            } else {
                classList.add('open');
            }
            e.preventDefault();
        });
    }

}) 

// **********************************************************************************************



let treeControl = {
    // *** Tree control buttons/ data render ***
    delete: function(node) {
        // node - is returned data form button
        console.log(node)
        contModal.open()
        contModal.setTamplate(modalTamplate.deleteNode) // Tamplate is in file modal_plugin.js
        contModal.setContent(node,'delete'); // arg node - is options in file modal_plugin.js
    },
    edite: function(node) {
        contModal.open()
        contModal.setTamplate(modalTamplate.editeNode)
        contModal.setContent(node,'edit');
    },
    new: function(node) {
    
        contModal.open()
        contModal.setTamplate(modalTamplate.newNode)
        contModal.setContent(node,'new');
    },
    renderData: function name(data) {
    
     data.forEach((e) => {

            // General tree generator
            let id = e.id;
            let name = e.name;
            let text = e.text;
            let parentId = e.parentId;
         
           
        
          if(parentId=== "0") {
            $('.tree').insertHTM('afterbegin',`<li id="id_${id}"><a href="#">${name}</a>
            <button class="btn  btn-add" name="id_${id}" onclick="treeControl.new(this)">Add</button>
            <button class="btn btn-del" name="id_${id}" onclick="treeControl.delete(this)">Delete</button>
            <button class="btn btn-edit" name="id_${id}" onclick="treeControl.edite(this)">Edit</button>

              </li>`)
          
         
        } else {
            let el = document.querySelector(`.cl${parentId}`);
            
        
         if (document.body.contains(el) ) {
            
            $(`.cl${parentId}`).insertHTM('afterbegin',`<li class="item-st"id="id_${id}"><a class="item__header" href="#">${name}</a>
            <p>${text}</p>
            <button class="btn  btn-add" name="id_${id}" onclick="treeControl.new(this)">Add</button>
            <button class="btn btn-del" name="id_${id}" onclick="treeControl.delete(this)">Delete</button>
            <button class="btn btn-edit" name="id_${id}" onclick="treeControl.edite(this)">Edit</button>
            </li>`)
         } else {
           
            $(`#id_${parentId}`).insertHTM('beforeend',`<ul class="cl_${parentId} " ><li id="id_${id}" class="item-st">
            <a class="item__header" href="#">${name}</a>
            <p>${text}</p>
            <button class="btn  btn-add" name="id_${id}" onclick="treeControl.new(this)">Add</button>
            <button class="btn btn-del" name="id_${id}" onclick="treeControl.delete(this)">Delete</button>
            <button class="btn btn-edit" name="id_${id}" onclick="treeControl.edite(this)">Edit</button>
            </li></ul>`)
          
         }
           
           
            
        }
        }); 
    }
}




