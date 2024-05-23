const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const SecondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#todoClearButton");
const filterInput = document.querySelector("#todoSearch")

let todos = [];


runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded)
    SecondCardBody.addEventListener("click",removeTodoUI)
    clearButton.addEventListener("click",allTodosEverywhere)
    filterInput.addEventListener("keyup",filter)
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
       todoListesi.forEach(function(todo){
           if(todo.textContent.toLowerCase().trim().includes(filterValue)){
               todo.setAttribute("style","display: block");
           }else{
               todo.setAttribute("style","display: none !important");
           }
       })
    }else{
        showAlert("warning","Filtreleme yapmak için en az bir todo olmalıdır")
    }
}

function allTodosEverywhere(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        //Ekrandan Silmek
        todoListesi.forEach(function(todo){
            todo.remove()
        })
        //Storageden Silmek
        todos = [];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Başarılı bir şekilde silindi.")
    }else{
        showAlert("warning","Silmek için en az bir todo olmalıdır.")
    }
}

function removeTodoUI(e){
    if(e.target.className === "fa fa-remove"){
        //Ekrandan Silmek
       const todo = e.target.parentElement.parentElement;
       todo.remove();
        //Storageden Silmek
        removeTodoToStorage(todo.textContent)
       showAlert("success","Todo Silindi")
    }

    
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage()
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos))
}


function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText == null || inputText == ""){
        showAlert("warning","Lütfen Todo Ekleyiniz.")
    }else{
     //Arayüze Ekleme
     addTodoUI(inputText);
     //Storage Ekleme
     addTodoStorage(inputText)
     showAlert("success","Todo Eklendi.")
    }
    
 
    
    e.preventDefault();
}


function addTodoUI(newTodo){
    const li = document.createElement("li");
          li.className="list-group-item d-flex justify-content-between";
          li.textContent=newTodo;
    const a = document.createElement("a");
          a.className="delete-item";
          a.href="#";
    const i = document.createElement("i");
          i.className="fa fa-remove";
          
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);      

    addInput.value = "";


    
}

function addTodoStorage(newTodo){
    checkTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    const div = document.createElement("div");
          div.className = `alert alert-${type}`;
          div.textContent = message;
     firstCardBody.appendChild(div);
   setTimeout(function(){
     div.remove();
   },2000)

}








