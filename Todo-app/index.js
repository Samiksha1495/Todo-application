'use strict'

document.addEventListener('DOMContentLoaded',function(){

    const todoForm = document.querySelector("#todo-form")
    const todoContainer = document.querySelector("#todo-body")

    const todoURL= `http://localhost:5000/records`;
   
    
    function itemObj(desc, check){
        this.description = desc
        this.check = check
    }

    var allItems=[]

    fetch(`${todoURL}`)
    .then(response => response.json())
    .then(data => data.forEach((item)=>{
        allItems = data
        console.log(item.check)
        todoContainer.innerHTML+=`
        <tr id= item-${item.id}>
        <td  id="desc-${item.id}" ng-class="${item.check}?'done':''">${item.description}</td>
        <td><input type="checkbox" data-id=${item.id} id="check-${item.id}" data-action="checkValue"></td>
        <td><button type="click" data-id=${item.id} id="delete-${item.id}" data-action="delete">Delete</button></td>
        </tr>
        `
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
            todoContainer.innerHTML+=`<tr id= item-${item.id}>
            <td id="desc-${item.id}" ng-class="${item.check}?'done':''">${item.description}</td>
            <td><input type="checkbox" data-id=${item.id} id="check-${item.id}" data-action="checkValue" ></td>
            <td><button type="click" data-id=${item.id} id="delete-${item.id}" data-action="delete">Delete</button></td>
            </tr>`
        })
    })

    //delete task

    todoContainer.addEventListener('click', function(e){
        e.preventDefault();

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
            const checkInput =  document.querySelector(`#check-${e.target.dataset.id}`)
            const checkUpdate = document.querySelector(`#item-${e.target.dataset.id}`)

            var obj= allItems.find(item => {return item.id == e.target.dataset.id})
            obj.check = checkInput.checked;
            fetch(`${todoURL}/${e.target.dataset.id}`,{
                method: 'PATCH',
                body : JSON.stringify(obj),
                headers:{'Content-Type':'application/json'}
            }).then(response=>response.json())
            .then( item => {
                console.log(item);
                checkUpdate.innerHTML = `<tr id= item-${item.id}>
                <td id="desc-${item.id}" ng-class="${item.check}?'done':''">${item.description}</td>
                <td><input type="checkbox" data-id=${item.id} id="check-${item.id}" data-action="checkValue" ></td>
                <td><button type="click" data-id=${item.id} id="delete-${item.id}" data-action="delete">Delete</button></td>
                </tr>`
            })
        }
    })

    //completed task

})