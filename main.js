/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-05-06 14:16:21
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-05-10 11:39:03
 * @FilePath: \todolist\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const standardTheme = document.querySelector(".standard-theme")
const lightTheme = document.querySelector(".light-theme")
const darkerTheme = document.querySelector(".darker-theme")

const todoInput = document.querySelector(".todo-input")
const todoBtn = document.querySelector(".todo-btn")
const todoList = document.querySelector(".todo-list")

todoBtn.addEventListener("click", addTodo)
document.addEventListener("DOMContentLoaded", getTodos)

standardTheme.addEventListener("click", () => changeName("standard"))
lightTheme.addEventListener("click", () => changeName("light"))
darkerTheme.addEventListener("click", () => changeName("darker"))

function changeName(color) {
    document.body.className = color;
    color === "darker" ? document.getElementById("tittle").classList.add("darker-title")
        : document.querySelector("input").classList.remove("darker-title")
    document.querySelector("input").className = `${color}-input`;

    document.querySelectorAll(".todo").forEach(todo => {
        console.log(todo.classList)
        Array.from(todo.classList).some(item => item === "completed") ?
            todo.className = `todo ${color}-todo completed` :
            todo.className = `todo ${color}-todo`
    })

    document.querySelectorAll("button").forEach(button => {
        Array.from(button.classList).some(item => {
            console.log(item)
            if (item == "check-btn") {
                button.className = `check-btn ${color}-button`
            } else if (item == "delete-btn") {
                button.className = `delete-btn ${color}-button`
            } else if (item == "todo-btn") {
                button.className = `todo-btn ${color}-button`
            }
        })
    })
}

var dt = new Date()
document.getElementById("datetime").innerHTML = dt.toLocaleString();


let savedTheme = localStorage.getItem("savedTheme")
savedTheme == null ? changeName("standard") : changeName(savedTheme)

function changeName(color) {
    localStorage.setItem("savedTheme", color)

    console.log(color)
    document.body.className = color;

}

/* <div class="todo standard-todo completed">
        <li>Add your personal Task......</li>
        <button class="check-btn standard-button"><i class="fas fa-check"></i></button>
        <button class="delete-btn standard-button"><i class="fas fa-trash"></i></button>
    </div> */


function addTodo(event) {
    console.log(event)
    event.preventDefault();

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo", `${savedTheme}-todo`)
    const newTodo = document.createElement("li")

    if (todoInput.value === "") {
        alert("东西呢？")
    } else {
        newTodo.innerText = todoInput.value
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)

        const checked = document.createElement("button")
        checked.innerHTML = '<i class="fas fa-check"></i>'
        checked.classList.add("check-btn", `${savedTheme}-button`)
        todoDiv.appendChild(checked)

        const deleted = document.createElement("button")
        deleted.innerHTML = '<i class="fas fa-trash"></i>'
        deleted.classList.add("delete-btn", `${savedTheme}-button`)
        todoDiv.appendChild(deleted)

        savelocal(todoInput.value)

        todoList.appendChild(todoDiv)
        todoInput.value = ""

        deleted.addEventListener("click", () => {
            removeLocalTodos(todoDiv)
            todoDiv.classList.add("fall");

            todoDiv.addEventListener("transitionend", () => {
                todoDiv.remove()
            })
        });

        checked.addEventListener("click", () => {
            newTodo.classList.toggle("completed");
        });
    }
}

function savelocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        console.log(todo);


        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo", `${savedTheme}-todo`);

        const newTodo = document.createElement("li");
        newTodo.innerText = todo
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const checked = document.createElement("button")
        checked.innerHTML = '<i class="fas fa-check"></i>'
        checked.classList.add("check-btn", `${savedTheme}-button`)
        todoDiv.appendChild(checked)

        const deleted = document.createElement("button")
        deleted.innerHTML = '<i class="fas fa-trash"></i>'
        deleted.classList.add("delete-btn", `${savedTheme}-button`)
        todoDiv.appendChild(deleted)


        deleted.addEventListener("click", () => {
            removeLocalTodos(todoDiv)
            todoDiv.classList.add("fall");

            todoDiv.addEventListener("transitionend", () => {
                todoDiv.remove()
            })
        });

        checked.addEventListener("click", () => {
            newTodo.classList.toggle("completed");
        });


        todoList.appendChild(todoDiv);
    })
}