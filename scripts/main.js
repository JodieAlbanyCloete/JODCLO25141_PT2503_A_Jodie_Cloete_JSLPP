import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";

// Fetch tasks from API
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

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
  console.log("initTaskBoard running...");
  clearExistingTasks();

  const loadingEl = document.querySelector("#loading-message");
  loadingEl.style.display = "block"; // show while loading

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
  await renderTasks(mergedTasks);
  loadingEl.style.display = "none";

  // 4. Save merged tasks so refresh doesn’t double them
  saveTasks(mergedTasks);

  // 5. Setup modal handlers
  setupModalCloseHandler();
  setupNewTaskModalHandler();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);

const loadingEl = document.querySelector("#loading-message");

async function fetchTasks() {
  try {
    // Show loading message
    loadingEl.style.display = "block";

    // Fetch tasks from API
    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    const tasks = await response.json();

    // // Hide loading message
    loadingEl.style.display = "none";

    // Render tasks
    renderTasks(tasks);
  } catch (error) {
    loadingEl.textContent = "Failed to load tasks";
    console.error("Error fetching tasks:", error);
  }
}
