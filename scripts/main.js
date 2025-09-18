import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";

// function initTaskBoard() {
//   const tasks = loadTasksFromStorage();
//   clearExistingTasks();
//   renderTasks(tasks);
//   setupModalCloseHandler();
//   setupNewTaskModalHandler();
// }

// document.addEventListener("DOMContentLoaded", initTaskBoard);

// Fetch tasks from API
async function fetchTasksFromAPI() {
  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!response.ok) throw new Error("Failed to fetch API tasks");
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}

async function initTaskBoard() {
  clearExistingTasks();

  // 1. Get API + local tasks
  const [apiTasks, localTasks] = await Promise.all([
    fetchTasksFromAPI(),
    loadTasksFromStorage(),
  ]);

  // 2. Prevent duplicates:
  // only include local tasks whose IDs are NOT in the API response
  const apiIds = new Set(apiTasks.map((task) => task.id));
  const mergedTasks = [
    ...apiTasks,
    ...localTasks.filter((task) => !apiIds.has(task.id)),
  ];

  // 3. Render merged tasks
  renderTasks(mergedTasks);

  // 4. Save merged tasks so refresh doesn’t double them
  saveTasks(mergedTasks);

  // 5. Setup modal handlers
  setupModalCloseHandler();
  setupNewTaskModalHandler();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
