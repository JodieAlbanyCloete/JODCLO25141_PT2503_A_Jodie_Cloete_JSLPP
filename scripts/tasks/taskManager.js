import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "../ui/render.js";
import { resetForm } from "./formUtils.js";

export function addNewTask() {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const overlay = document.querySelector(".modal-overlay");

  if (!title) return;

  const tasks = loadTasksFromStorage();
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description,
    status,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);

  clearExistingTasks();
  renderTasks(updatedTasks);
  resetForm();
  overlay.close();
}

export function editTask(taskId) {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const overlay = document.querySelector(".modal-overlay");

  if (!title) return;

  const tasks = loadTasksFromStorage() || [];

  const updatedTasks = tasks.map(function (task) {
    if (task.id === taskId) {
      console.log("Found task to update:", task);
      return {
        ...task,
        title: title,
        description: description,
        status: status,
      };
    }
    return task;
  });

  saveTasksToStorage(updatedTasks);
  clearExistingTasks();
  renderTasks(updatedTasks);
  resetForm();
  overlay.close?.(); // optional in case overlay is a <dialog>
}

saveChangesBtn.addEventListener("click", function () {
  const taskIdStr = document.getElementById("task-id").value;
  const taskId = parseInt(taskIdStr, 10);

  if (isNaN(taskId)) {
    console.log("No valid taskId — maybe this is a new task");
    return;
  }

  console.log("Editing task with ID:", taskId);
  editTask(taskId);
});
