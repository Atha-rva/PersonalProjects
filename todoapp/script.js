// Select Elements
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const clearAllButton = document.getElementById("clear-all-button");
const taskCount = document.getElementById("task-count");
const completedCount = document.getElementById("completed-count");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Update Task Counts
function updateTaskCounts() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  taskCount.textContent = `Total Tasks: ${totalTasks}`;
  completedCount.textContent = `Completed: ${completedTasks}`;
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks
function renderTasks() {
  todoList.innerHTML = ""; // Clear list
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.classList.toggle("completed", task.completed);

    // Checkbox for completing tasks
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      updateTaskCounts();
      renderTasks();
    });

    // Task text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      updateTaskCounts();
      renderTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });

  updateTaskCounts();
}

// Add Task
addButton.addEventListener("click", () => {
  const taskText = todoInput.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    updateTaskCounts();
    renderTasks();
    todoInput.value = "";
  } else {
    alert("Please enter a task.");
  }
});

// Clear All Tasks
clearAllButton.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  updateTaskCounts();
  renderTasks();
});

// Initialize App
renderTasks();
