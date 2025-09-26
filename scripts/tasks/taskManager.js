import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "../ui/render.js";
import { resetForm } from "./formUtils.js";

export let tasks = [];

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
  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();
  const status = document.getElementById("task-status").value;
  const overlay = document.querySelector("task-modal");

  if (!title) return;

  const tasks = loadTasksFromStorage() || [];
  let updatedTask = null;

  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      updatedTask = {
        ...task,
        title,
        description,
        status,
      };
      return updatedTask;
    }
    return task;
  });

  // Save updated tasks
  saveTasksToStorage(updatedTasks);

  // ✅ Update the DOM in place
  if (updatedTask) {
    const taskEl = document.querySelector(
      `.task-div[data-id="${updatedTask.id}"]`
    );
    if (taskEl) {
      // Update content
      taskEl.textContent = updatedTask.title;

      // Move to correct column if status changed
      const container = document.querySelector(
        `.column-div[data-status="${updatedTask.status}"] .tasks-container`
      );
      if (container && taskEl.parentElement !== container) {
        container.appendChild(taskEl);
      }
    }
  }

  resetForm();
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

export function deleteTask(taskId) {
  const deleteEl = document.querySelector(`.task-div[data-id="${taskId}"]`);
  if (deleteEl) {
    deleteEl.remove();
  }
  // 2. Remove from in-memory array
  tasks = tasks.filter((task) => task.id !== parseInt(taskId, 10));

  // 3. API delete request
  fetch(`https://jsl-kanban-api.vercel.app/tasks/${taskId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete task");
      console.log(`Task ${taskId} deleted successfully`);
    })
    .catch((err) => {
      console.error("Error deleting task:", err);
      // Optional rollback if you want to re-add the task
    });
}

const deleteBtn = document.getElementById("deleteTaskBtn");

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault(); // stop form submission

  const taskId = document.getElementById("task-id").value;
  if (!taskId) return;

  const confirmed = confirm("Are you sure you want to delete this task?");
  if (!confirmed) return; // exit if user clicks "Cancel"

  // Call delete function
  deleteTask(taskId);
});
