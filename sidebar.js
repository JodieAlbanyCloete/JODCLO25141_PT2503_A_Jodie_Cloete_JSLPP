document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo"); // the logo image
  const sidebar = document.getElementById("side-bar-div"); // the sidebar

  logo.addEventListener("click", function () {
    sidebar.classList.toggle("open"); // add/remove class
  });
});
