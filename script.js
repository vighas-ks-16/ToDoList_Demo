document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");

  const addTaskButton = document.getElementById("add-task-btn");

  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  //Add Task in array and local storage
  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();//takes input from <input> tag in html|.trim() removes whitespaces from either ends 
    if (taskText === "") return; //if input is empty it does nothing
   
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    }; //adding id and completed to the added task 




    tasks.push(newTask); //pushing into array
    saveTasks(); //saves the changes made in array to local storage
    renderTask(newTask);
    todoInput.value = ""; //clear input
    console.log(tasks);
  });

  

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
