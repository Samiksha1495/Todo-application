console.log("enter")
// var XMLHttpRequest = require('xhr2');
var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:3000/records";

xmlhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        console.log(myArr)
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

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
        descriptionCol.classList.toggle("done");
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
    getCurrentCity();

}

function getCurrentCity() {
    
    return fetch("http://localhost:3000/records")
        .then(response => console.log(response.json()))
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
   
    var status = xhr.status;
    if (status === 200) {
    callback(null, xhr.response);
    } else {
    callback(status, xhr.response);
    }
    
    xhr.send();
};