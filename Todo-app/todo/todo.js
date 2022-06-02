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
    const descriptionCol = document.createElement("td")
    descriptionCol.innerText = todoinput.value;
    descriptionCol.classList.add("todo-item")
    newtodo.appendChild(descriptionCol);
    todoinput.value = "";

    //add td checkbox
    const compeletedCol = document.createElement("td")
    const completedCheckBox = document.createElement("input")
    completedCheckBox.setAttribute("type","checkbox")
    // newtodoCheck.innerHTML = `<input type='checkbox'>`
    completedCheckBox.onclick = function(e){
        compeletedCol.classList.toggle("done");
        descriptionCol.classList.toggle("done")
        // e.path[0].disabled = true
    }
    compeletedCol.appendChild(completedCheckBox)
    compeletedCol.classList.add("todo-check")
    newtodo.appendChild(compeletedCol);

    //add td button
    const deleteCol = document.createElement("td")
    const deleteButton= document.createElement("button")
    deleteButton.setAttribute("type",'submit')
    deleteButton.innerHTML="Delete"
    // newtodoDelete.innerHTML = `<button type='submit'>Delete</button>`
    deleteButton.onclick = function(){
        deleteCol.parentElement.remove();
    }
  
    deleteCol.classList.add("todo-delete")
    deleteCol.appendChild(deleteButton)
    newtodo.appendChild(deleteCol);

    //attach final todo
    todotable.appendChild(newtodo)

}

