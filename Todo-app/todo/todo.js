//load full dataset from json db
'use strict'

console.log("enter")
var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:5000/records";
var myArr;
xmlhttp.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        myArr = JSON.parse(this.responseText);
        console.log(myArr)
        loadData(myArr)
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

function loadData(myArr) {
    console.log(myArr.length)
    for (let i = 0; i < myArr.length; i++) {
        console.log(myArr[i]);
    }
}



function addTask(e) {
    console.log("inside")
    e.preventDefault();
    var task = {}
    // ++rowCount;

    //add tr

    const newtodo = document.createElement("tr");
    newtodo.classList.add("todos")

    //add td item
    const descriptionCol = document.createElement("td")
    descriptionCol.innerText = todoinput.value;
    descriptionCol.classList.add("todo-item")
    newtodo.appendChild(descriptionCol);


    //add td checkbox
    const compeletedCol = document.createElement("td")
    const completedCheckBox = document.createElement("input")
    completedCheckBox.setAttribute("type", "checkbox")
    // newtodoCheck.innerHTML = `<input type='checkbox'>`
    completedCheckBox.onclick = function (e) {
        compeletedCol.classList.toggle("done");
        descriptionCol.classList.toggle("done");

        // e.path[0].disabled = true
    }
    compeletedCol.appendChild(completedCheckBox)
    compeletedCol.classList.add("todo-check")
    newtodo.appendChild(compeletedCol);

    //add td button
    const deleteCol = document.createElement("td")
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("type", 'submit')
    deleteButton.innerHTML = "Delete"
    // newtodoDelete.innerHTML = `<button type='submit'>Delete</button>`
    deleteButton.onclick = function () {
        deleteCol.parentElement.remove();
    }

    deleteCol.classList.add("todo-delete")
    deleteCol.appendChild(deleteButton)
    newtodo.appendChild(deleteCol);

    //attach final todo
    todotable.appendChild(newtodo)
    task["description"] = todoinput.value;
    task["check"] = completedCheckBox.value == 'on' ? false : true;
    // task["delete"] = deleteButton.value;

    todoinput.value = "";
    postData(task,e)
 
}

// function sleep(ms) {
//     console.log("sleeping")
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

function postData(task,e) {
    let response = fetch('http://localhost:5000/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(task)
      });
      e.preventDefault();
    //   let result = response.json();
    //   alert(result.message);
    return false
}


