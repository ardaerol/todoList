const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

const filter = document.querySelector("#filter");
const clearBtn = document.querySelector("#clear-todos");


eventListener();

function eventListener(){

    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondCardBody.addEventListener("click",deleteTodo)
    filter.addEventListener("keyup",todoFilter)
    clearBtn.addEventListener("click",clearTodo)
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));

}

function clearTodo(e){
    if(confirm("Tüm todoları silmek istediğinize emin misiniz?")){
        // arayüzden todoları silme
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
        showAlert("success","Tüm todolar silindi")
    }
}

function todoFilter(e){
    const filterValue = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item ");

    listItem.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            // filter valueden gelen yazı yoksa
            listItem.setAttribute("style","display: none !important");
        }else{
            listItem.setAttribute("style","display: block ");
        }
    })
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Todo başarıyla silindi")
    }
}

function addTodo(e){
    e.preventDefault();
    const newTodo = todoInput.value.trim();
    
    if(newTodo === ""){
        showAlert("danger","Lütfen bir todo giriniz...")
    }else{
        addTodoToUI(newTodo);
        todoInput.value ="";
        showAlert("success","Todo ekleme başarılı...")
        addTodoToStorage(newTodo);
    }

    
    
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(todo => addTodoToUI(todo));
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));


}

function addTodoToUI(newTodo){
//     <!-- <li class="list-group-item d-flex justify-content-between">
//     Todo 1
//     <a href = "#" class ="delete-item">
//         <i class = "fa fa-remove"></i>
//     </a>

// </li> -->

const listItem = document.createElement("li")
const link = document.createElement("a");

link.href = "#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>";

listItem.className = "list-group-item d-flex justify-content-between";
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

todoList.appendChild(listItem);


}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove()
    },1500);
}