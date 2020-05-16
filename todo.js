const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();





function eventListeners(){

    form.addEventListener("submit",addToDo);

    document.addEventListener("DOMContentLoaded",loadToDoFromStorage);

    secondCardBody.addEventListener("click",deleteToDo);

    filter.addEventListener("keyup",filterTodos);

    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){
    if(confirm("Are you sure delete from All Todo List")){
        while(!(todoList.firstElementChild===null)){
            todoList.firstElementChild.remove();
        }
    }

    showAlert("success","Succesfully deleted All Tasks!!!")
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItem=document.querySelectorAll(".list-group-item");

    listItem.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
           listItem.setAttribute("style","display:none !important")
        }
        else{
            listItem.setAttribute("style","display:block ")
        }

    });
}

function deleteToDo(e){


    if(e.target.className==="fa fa-remove"){

        e.target.parentElement.parentElement.remove();
        deleteToDoFromStorage(e.target.parentElement.parentElement.textContent);
        
        showAlert("success","Succesfully deleted a Todo")
        
    }
}

function deleteToDoFromStorage(deleteItem){

    
    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        
        if(todo===deleteItem){
           console.log("if"+todo)
            todos.splice(index,1);

        }
       
    });

    localStorage.setItem("todos",JSON.stringify(todos));    
}

function loadToDoFromStorage(e){
    
    let todos=JSON.parse(localStorage.getItem("todos"));

    todos.forEach(element => {
        addToDoUI(element)
    });

    
}

function addToDo(e){

    const newTodo=todoInput.value.trim();

    if(newTodo===""){

        showAlert("danger","Please Add a Todo");

    }
    else{
        addToDoUI(newTodo);
        showAlert("success","Succesfully Added a Todo");
        addTodoStorage(newTodo);
    }

    


    e.preventDefault();
}

function addToDoUI(newTodo){


    const listItem=document.createElement("li");
    listItem.className="list-group-item d-flex justify-content-between";

    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);


    todoList.appendChild(listItem);
    todoInput.value="";

}

function showAlert(type,message){
  /*  <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
    </div> */
    const alert=document.createElement("div");

    if(type==="danger"){
        alert.className="alert alert-warning";
        alert.role="alert";
        alert.appendChild(document.createTextNode(message));
        firstCardBody.appendChild(alert);
    }
    if(type==="success"){
        alert.className="alert alert-success";
        alert.role="alert";
        alert.appendChild(document.createTextNode(message));
        firstCardBody.appendChild(alert);
    }

    setTimeout(function(){
        alert.remove();
    },1000);
    
}

function getTodosFromStorage(){

    let todos;

    if(localStorage.getItem("todos")===null){

        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}

function addTodoStorage(newTodo){

    let todos=getTodosFromStorage();
    
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}