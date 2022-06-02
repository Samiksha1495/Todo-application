// select DOM
var rowCount = 0;
const form = document.querySelector(".form-inline")
const todoinput = document.querySelector(".todo-input")
const todotable = document.querySelector(".todo-table-tbody")
const todosubmit = document.querySelector(".todo-submit")

// event listner

todosubmit.addEventListener("click", addTask);

//functions



tasks=[]
function addTask(e){
    e.preventDefault()
    // ++rowCount;
    
    //add tr

    const newtodo = document.createElement("tr");
    newtodo.classList.add("todos")

    //add td item
    const newtodoItem = document.createElement("td")
    newtodoItem.innerText = todoinput.value;
    newtodoItem.classList.add("todo-item")
    newtodo.appendChild(newtodoItem);
    todoinput.value = "";

    //add td checkbox
    const newtodoCheck = document.createElement("td")
    newtodoCheck.innerHTML = `<input type='checkbox'>`
    newtodoCheck.onclick = function(e){
        newtodoCheck.parentElement.classList.toggle("done");
        e.path[0].disabled = true
    }
    newtodoCheck.classList.add("todo-check")
    newtodo.appendChild(newtodoCheck);

    //add td button
    const newtodoDelete = document.createElement("td")
    newtodoDelete.innerHTML = `<button type='submit'>Delete</button>`
    newtodoDelete.onclick = function(){
        newtodoDelete.parentElement.remove();
    }
    newtodoDelete.classList.add("todo-delete")
    newtodo.appendChild(newtodoDelete);

    //attach final todo
    todotable.appendChild(newtodo)
    
}

