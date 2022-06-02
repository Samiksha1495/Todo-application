// select DOM

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
    const rowCount = todotable.rows.length

    //add tr

    const newtodo = document.createElement("tr");
    newtodo.classList.add("todos-"+ rowCount)

    //add td item
    const newtodoItem = document.createElement("td")
    newtodoItem.innerText = todoinput.value;
    newtodoItem.classList.add("todo-item-"+ rowCount)
    newtodo.appendChild(newtodoItem);
    todoinput.value = "";

    //add td checkbox
    const newtodoCheck = document.createElement("td")
    newtodoCheck.innerHTML = `<input type='checkbox' id= "todo-input-${rowCount}">`
    newtodoCheck.onclick = function(){
        newtodoCheck.parentElement.classList.toggle("done");
        document.getElementById('todo-input-' + rowCount).disabled = true;
        document.getElementById('todo-delete-' + rowCount).disabled = true;
    }
    newtodoCheck.classList.add("todo-check-"+ rowCount)
    newtodo.appendChild(newtodoCheck);

    //add td button
    const newtodoDelete = document.createElement("td")
    newtodoDelete.innerHTML = `<button type='submit' id = "todo-delete-${rowCount}">Delete</button>`
    newtodoDelete.onclick = function(){
        newtodoDelete.parentElement.remove();
    }
    newtodoDelete.classList.add("todo-delete-" + rowCount)
    newtodo.appendChild(newtodoDelete);

    //attach final todo
    todotable.appendChild(newtodo)
}

