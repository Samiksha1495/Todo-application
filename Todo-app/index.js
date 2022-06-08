'use strict'

document.addEventListener('DOMContentLoaded',function(e){

    const todoForm = document.querySelector("#todo-form")
    const todoContainer = document.querySelector("#todo-body")

    const todoURL= `http://localhost:5000/records`;
   
    
    function itemObj(desc, check){
        this.description = desc
        this.check = check
    }

    var allItems=[]
    e.preventDefault()
    e.stopPropagation()

    fetch(`${todoURL}`)
    .then(response => response.json())
    .then(data => data.forEach((item)=>{
        allItems = data
        console.log(item.check)

        todoContainer.innerHTML+=`<tr id= item-${item.id} >
        <td id="desc-${item.id}">${item.description}</td>
        <td><input type="checkbox" data-id=${item.id} id="check-${item.id}" data-action="checkValue" ></td>
        <td><button type="click" data-id=${item.id} id="delete-${item.id}" data-action="delete">Delete</button></td>
        </tr>`

        if(item.check){
            var row= document.querySelector(`#desc-${item.id}`).classList.add("done")
            document.querySelector(`#check-${item.id}`).setAttribute("checked", true)
        }
    }))

    //create post

    todoForm.addEventListener('submit',function(e){
        e.preventDefault();
        const descInput = todoForm.querySelector("#description").value;
        var task = new itemObj(descInput,false);

        fetch(`${todoURL}`, {
            method: 'POST',
            body: JSON.stringify(task),
        //learn more about headers: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#headers
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(item =>{
            allItems.push(item)
            todoContainer.innerHTML+=`<tr id= item-${item.id} >
            <td id="desc-${item.id}" >${item.description}</td>
            <td><input type="checkbox" data-id=${item.id} id="check-${item.id}" data-action="checkValue" ></td>
            <td><button type="click" data-id=${item.id} id="delete-${item.id}" data-action="delete">Delete</button></td>
            </tr>`
        })
    })

    //delete task
    // const deleteButoon = document.get
    todoContainer.addEventListener('click', function(e){
        // e.preventDefault();

        if(e.target.dataset.action == 'delete'){
            document.querySelector(`#delete-${e.target.dataset.id}`).remove()
            fetch(`${bookURL}/${e.target.dataset.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            }).then( response => response.json())
        }

        if(e.target.dataset.action == 'checkValue'){

            e.stopPropagation()

            const checkInput =  document.querySelector(`#check-${e.target.dataset.id}`)
            const checkUpdate = document.querySelector(`#desc-${e.target.dataset.id}`)
            
            var obj= allItems.find(item => {return item.id == e.target.dataset.id})
            obj.check = checkInput.checked;

            if(checkInput.checked){
                checkUpdate.classList.add("done")
            }
            if(!checkInput.checked){
                checkUpdate.classList.remove("done")
            }

            fetch(`${todoURL}/${e.target.dataset.id}`,{
                method: 'PATCH',
                body : JSON.stringify(obj),
                headers:{'Content-Type':'application/json'}
            }).then(response=>response.json())
            .then( item => {
                console.log(item);
            })
        }
    })

    //completed task

})