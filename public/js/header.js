let searchIcon = document.getElementsByClassName("buscador-icon")[0];
let searchBar = document.getElementById("search-bar");
var searchBarStatus = searchBar.style.width;
let navBarMenu = document.querySelector(".dropButton");
let dropMenu = document.querySelector(".nav-bar-drop");
searchIcon.addEventListener("click", () => {
  if (searchBarStatus == "0vw" || searchBarStatus == "") {
    searchBarStatus = 40 + "vw";
    searchBar.style.width = searchBarStatus;
    searchBar.style.animation = "slide-in 1s";
  } else {
    searchBar.style.animation = "slide-out 1s";
    searchBarStatus = 0 + "vw";
    searchBar.style.width = searchBarStatus;
  }
});

navBarMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("show");
});
