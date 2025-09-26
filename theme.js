document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-button");
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    toggleBtn.checked = true;
  }

  // Save theme to localStorage on toggle
  toggleBtn.addEventListener("change", function () {
    if (toggleBtn.checked) {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark"); // Save dark theme to local storage
    } else {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light"); // Save light theme to local storage
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sideToggleBtn = document.getElementById("side-toggle-button");
  const body = document.body;

  //Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    sideToggleBtn.checked = true;
  }

  //Save theme to localStorage on toggle
  sideToggleBtn.addEventListener("change", function () {
    if (sideToggleBtn.checked) {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark"); //Save dark theme to local storage
    } else {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light"); // Save light theme to local storage
    }
  });
});
