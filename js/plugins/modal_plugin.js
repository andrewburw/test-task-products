/* *************************************************************
|
|
|                      Modal Plugin JS file
|
|     I usually use plain js (in gulp enviroment),
|     for better development and code organisation. 
|
|         *This file is modal generator.
|          
|      
|      My page: https://andrewburw.github.io/personalpage/
|
|
| **************************************************************/

const cM = {};

function _createModal(options) {

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
   
   <div class="modal-content">
    <header class="modal-header">
     <span class="close" aria-label="close" data-close='true'>&times;</span>
       <h1 class="modal-head-title" data-modaltitle>Web Project:</h1>
     
     </header>
     <section class="modal-body" data-settemplate>
     </section>
     <footer class="modal-foot" data-footerbuttons>
      
     </footer>
   </div>
     `)

  $('main').insertChildNode(modal);

  return modal;

}


//--------------------------------------------------
cM.contentModal = function () {
  const $modal = _createModal();
  const modal = {
    open() {
      $modal.classList.add('is-active')
    },
    close() {
      $modal.classList.remove('is-active')

    },
    setTamplate(template) {
      $modal.querySelector('[data-settemplate]').innerHTML = template;


    }
  }

  $modal.addEventListener('click', event => {
    // ---------- Modal buttns action --------------
    if (event.target.dataset.close) {

      modal.close();

    } else if (event.target.dataset.senddelete) {
     // ******   post data   ******
      let id = $modal.querySelector('[data-deletID]').name.split('_')[1];
 
      fetchData.delete(id)

    } else if (event.target.dataset.sendedit) {
       // ******   update data   ******
      let id = $modal.querySelector('[data-editID]').name.split('_')[1];

      fetchData.update({
        id: id,
        name: $modal.querySelector('[data-editname]').value,
        text: $modal.querySelector('[data-edittext]').value
    }) ? alert("Error in form!") : modal.close() ;
    
    }
    else if (event.target.dataset.sendnew) {
      // post data 
       let id = $modal.querySelector('[data-newID]').name.split('_')[1];
      
      fetchData.post({ 
        parentId: id,
        name: $modal.querySelector('[data-newname]').value,
        text: $modal.querySelector('[data-newtext]').value
      })? alert("Error in form!") : modal.close() ;
   
    }
  })
  // -------------------------------------------------
  return Object.assign(modal, {
    setContent(options, template) {
      if (template === 'delete') {

        $modal.querySelector('[data-modaltitle]').innerHTML = 'Delete ';
        $modal.querySelector('[data-deletID]').name = `${options.name}`; // tamplate data-deletID 
        $modal.querySelector('[data-footerbuttons]').innerHTML = `

     <button class="btn-big btn__modal-send"  data-senddelete='true'>Delete</button>
     <button class="btn-big btn__modal-colse"  data-close='true'>Close info</button>`



      } else if (template === 'edit') {
       

        $modal.querySelector('[data-modaltitle]').innerHTML = 'Edit Info';
        $modal.querySelector('[data-editID]').name = `${options.name}`;
        $modal.querySelector('[data-footerbuttons]').innerHTML = `

  <button class="btn-big btn__modal-send"  data-sendedit='true'>Send</button>
  <button class="btn-big btn__modal-colse"  data-close='true'>Close info</button>`

      } else if (template === 'new') {
      
        $modal.querySelector('[data-modaltitle]').innerHTML = 'Add New';
        $modal.querySelector('[data-newID]').name = `${options.name}`; // newID - it's parent ID
        $modal.querySelector('[data-footerbuttons]').innerHTML = `

  <button class="btn-big btn__modal-send"  data-sendnew='true'>Send</button>
  <button class="btn-big btn__modal-colse"  data-close='true'>Close info</button>`

      }

    }

  });
}

const contModal = cM.contentModal()


/* ****************************************** */
//               TEMPLATES         
/* ****************************************** */
const modalTamplate = {
  deleteNode: `
    <div class="modal__contetn-delete">
    <p> Are you shore , delete this node ? </p>
    <p data-deletID></p>
    </div>
    `,
  editeNode: `
    <div class="modal__f_container">
    <h1 data-editID></h1>
    <div class="main__form-group">
                  <label for="name">NAME</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter name"
                    maxlength="20"
                    autocomplete="off"
                    data-editname
                  />
    </div>  

    <div class="main__form-group">
    <label for="txt">TEXT</label>
    <input
      type="text"
      class="form-control"
      id="text"
      placeholder="Enter name"
      maxlength="30"
      autocomplete="off"
      data-edittext
    />
</div>   
    </div>            
    `,
    newNode: `
    <div class="modal__f_container">
    <h1 data-newID></h1>
    <div class="main__form-group">
                  <label for="name">NAME</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter name"
                    maxlength="20"
                    autocomplete="off"
                    data-newname
                  />
    </div>   
    <div class="main__form-group">
    <label for="txt">TEXT</label>
    <input
      type="text"
      class="form-control"
      id="text"
      placeholder="Enter name"
      maxlength="20"
      autocomplete="off"
      data-newtext
    />
</div>   
    </div>            
    `


}

