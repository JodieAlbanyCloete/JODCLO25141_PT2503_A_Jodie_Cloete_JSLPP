document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo"); // the logo image
  const sidebar = document.getElementById("side-bar-div"); // the sidebar

  logo.addEventListener("click", function () {
    sidebar.classList.toggle("open"); // add/remove class
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hideSideBarBtn = document.querySelector(".hide-sidebar");
  const navSidebar = document.getElementById("side-bar-div");

  hideSideBarBtn.addEventListener("click", function () {
    navSidebar.classList.toggle("hide");
    console.log("button is clicked");
  });
});
