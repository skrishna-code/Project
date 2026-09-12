// ==========================================
// Todo List using Local Storage
// ==========================================


// Get HTML elements
const todoName = document.getElementById("todoName");
const todoDate = document.getElementById("todoDate");
const todoPriority = document.getElementById("todoPriority");
const addBtn = document.getElementById("addBtn");

const todayList = document.getElementById("todayList");
const futureList = document.getElementById("futureList");
const completedList = document.getElementById("completedList");


// ==========================================
// Get todos from localStorage
// ==========================================

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];


// ==========================================
// Save todos to localStorage
// ==========================================

function saveTodos() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}


// ==========================================
// Get today's date
// Format: YYYY-MM-DD
// ==========================================

function getTodayDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// ==========================================
// Format date for display
// YYYY-MM-DD -> DD/MM/YYYY
// ==========================================

function formatDate(dateString) {

    const parts = dateString.split("-");

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}


// ==========================================
// Add Todo
// ==========================================

addBtn.addEventListener("click", function () {

    const name = todoName.value.trim();
    const date = todoDate.value;
    const priority = todoPriority.value;


    // Validation
    if (name === "") {
        alert("Please enter item name.");
        return;
    }

    if (date === "") {
        alert("Please select a deadline.");
        return;
    }

    if (priority === "") {
        alert("Please select priority.");
        return;
    }


    // Create todo object
    const newTodo = {
        name: name,
        date: date,
        priority: priority,
        completed: false
    };


    // Add todo to array
    todoList.push(newTodo);


    // Save to localStorage
    saveTodos();


    // Clear inputs
    todoName.value = "";
    todoDate.value = "";
    todoPriority.value = "";


    // Display todos
    displayTodos();

});


// ==========================================
// Display Todos
// ==========================================

function displayTodos() {

    // Clear existing lists
    todayList.innerHTML = "";
    futureList.innerHTML = "";
    completedList.innerHTML = "";


    const today = getTodayDate();


    let todayTodos = [];
    let futureTodos = [];
    let completedTodos = [];


    // Separate todos
    todoList.forEach(function (todo, index) {

        if (todo.completed) {

            completedTodos.push({
                ...todo,
                index: index
            });

        } else if (todo.date === today) {

            todayTodos.push({
                ...todo,
                index: index
            });

        } else {

            // Future tasks also include
            // incomplete tasks with past dates
            futureTodos.push({
                ...todo,
                index: index
            });

        }

    });


    // Display today's todos
    if (todayTodos.length === 0) {

        todayList.innerHTML =
            `<div class="empty-message">No tasks for today.</div>`;

    } else {

        todayTodos.forEach(function (todo, position) {

            todayList.innerHTML += createTodoHTML(
                todo,
                position + 1
            );

        });

    }


    // Display future todos
    if (futureTodos.length === 0) {

        futureList.innerHTML =
            `<div class="empty-message">No future tasks.</div>`;

    } else {

        futureTodos.forEach(function (todo, position) {

            futureList.innerHTML += createTodoHTML(
                todo,
                position + 1
            );

        });

    }


    // Display completed todos
    if (completedTodos.length === 0) {

        completedList.innerHTML =
            `<div class="empty-message">No completed tasks.</div>`;

    } else {

        completedTodos.forEach(function (todo, position) {

            completedList.innerHTML += createTodoHTML(
                todo,
                position + 1
            );

        });

    }

}


// ==========================================
// Create Todo HTML
// ==========================================

function createTodoHTML(todo, number) {

    const completedClass =
        todo.completed ? "completed" : "incomplete";


    return `
        <div class="todo-item ${completedClass}">

            <div class="todo-name">
                ${number}. ${escapeHTML(todo.name)}
            </div>

            <div class="todo-date">
                ${formatDate(todo.date)}
            </div>

            <div class="todo-priority">
                Priority: ${escapeHTML(todo.priority)}
            </div>

            <div class="todo-actions">

                ${
                    !todo.completed
                    ?
                    `
                    <button
                        class="action-btn complete-btn"
                        onclick="completeTodo(${todo.index})"
                        title="Complete"
                    >
                        ✓
                    </button>
                    `
                    :
                    ""
                }

                <button
                    class="action-btn delete-btn"
                    onclick="deleteTodo(${todo.index})"
                    title="Delete"
                >
                    🗑
                </button>

            </div>

        </div>
    `;
}


// ==========================================
// Complete Todo
// ==========================================

function completeTodo(index) {

    todoList[index].completed =
        !todoList[index].completed;


    saveTodos();

    displayTodos();
}


// ==========================================
// Delete Todo
// ==========================================

function deleteTodo(index) {

    const confirmation =
        confirm("Are you sure you want to delete this task?");


    if (!confirmation) {
        return;
    }


    todoList.splice(index, 1);


    saveTodos();

    displayTodos();
}


// ==========================================
// Prevent HTML injection
// ==========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ==========================================
// Allow Enter key to add task
// ==========================================

todoName.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addBtn.click();
    }

});


// ==========================================
// Initial display
// ==========================================

displayTodos();