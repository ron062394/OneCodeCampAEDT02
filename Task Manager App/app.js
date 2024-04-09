//Select DOM elements
const todoInput = document.querySelector(".todo-input"); //Acess the 'todo-input'
const todoButton = document.querySelector(".todo-button") //Access the 'todo-button'
const todoList = document.querySelector(".todo-list") //Access the 'todo-list'
const filterOption = document.querySelector(".filter-todo") //Access the 'filter-todo'

//Event Listeners
todoButton.addEventListener("click", addTodo); // 3. Add new task when button is clicked



//1. Function to save task to the localStorage / Middleware
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// 2. Function to add a new task
function addTodo(e) {
    // Prevent form submission
    e.preventDefault();

    // Create a new todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create a new list item for the task
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    // Save the task to LocalStorage
    saveLocalTodos(todoInput.value);

    // Add classes and append the new list item to the todo div
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    // Create a button to mark the task as completed
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);


    // Create a button to delete the task
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append the todo div to the todo list
    todoList.appendChild(todoDiv);

}