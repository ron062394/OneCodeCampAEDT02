// Select DOM Elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener("click", addTodo); // 3. Add new task when thhe add button is clicked
document.addEventListener("DOMContentLoaded", getTodos); // 5. Load task from the localStorage
todoList.addEventListener("click", deleteTodo); // Delete or complete a task when a button is clicked

// 1. Function to save task to the LocalStorage / middleware
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }  else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 2. Function to add a new task
function addTodo(e) {
    // Prevent form submission
    e.preventDefault();

    // Create a new todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create a new list item for the task
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    // Save the task to Local Storage
    saveLocalTodos(todoInput.value);

    // Append the new list item to the todo Div container
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    // Create a button to mark the task as completed
    const completedButton = document.createElement("button");
    completedButton.innerHTML =  '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);


    // Create a button delete the task
    const trashButton = document.createElement("button");
    trashButton.innerHTML =  '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    // Append the todo div to the todo list
    todoList.appendChild(todoDiv);
}

// 4. Function to load task from localStorage when the page is load
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }  else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        // Create a new todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        // Create a new list item for the task
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Create a button to mark the task as completed
        const completedButton = document.createElement("button");
        completedButton.innerHTML =  '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);


        // Create a button delete the task
        const trashButton = document.createElement("button");
        trashButton.innerHTML =  '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append todo div to the todo list
        todoList.appendChild(todoDiv);


    });
}


// 6. Function to remove task from localStorage / Middleware
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }  else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    // Task 1, Task 2
    todos.splice(todos.indexOf(todoIndex), 1)
    // Task 2
    localStorage.setItem("todos", JSON.stringify(todos));
}


//  7. Function to delete or complete a task
function deleteTodo(e) {
    const item = e.target;
    // If the delete button is clicked
    if (item.classList[0] === "trash-btn") {
        //If the button is cliked, remove the task from the list
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }

    // If the complete button is clicked
    if (item.classList[0] === "complete-btn") {
        // If the complete button is clicked, toggle the completed class
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}