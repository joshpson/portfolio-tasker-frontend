console.log("Index.js loaded");

//Global Variables and Functions

let currentUser;

function projectContainer() {
  return document.getElementById("projects");
}

function projectFormContainer() {
  return document.getElementById("new-project");
}

function loginForm() {
  return document.querySelector("#login-form");
}

function loginFormDiv() {
  return document.querySelector("#login-form-div");
}

function loginData() {
  return document.querySelector('input[name="username"]').value;
}

function projectData() {
  return document.querySelector('input[name="project"]').value;
}

function projectButton() {
  return document.querySelector(".project-button");
}

function hideLoginFormDiv() {
  loginFormDiv().style.display = "none";
}

function getActionBar() {
  return document.querySelector(".actionbar");
}

// function sortOptions() {
//   // let aSort = document.createElement("a");
//   // aSort.className = "sort-az";
//   sortButton = document.createElement("input");
//   sortButton.className = "sort";
//   sortButton.type = "image";
//   sortButton.src = "./img/sort.png";
//   return getActionBar().appendChild(sortButton);
// }

//Event Listeners

function loginFormListener() {
  loginForm().addEventListener("submit", function(e) {
    e.preventDefault();
    User.login();
  });
}

function projectButtonListener() {
  projectButton().addEventListener("click", e => {
    e.preventDefault();
    let data = {
      title: "New Project Title"
    };
    postProject(data).then(json => {
      let project = new Project(json);
      let userProjectData = {
        project_id: json.id,
        user_id: currentUser.id
      };
      postUserProject(userProjectData);
      project.renderProjectDiv();
    });
  });
}

// function sortButtonListener() {
//   sortOptions().addEventListener("click", (e) => {
//     console.log("clicked sort button")
//     let dropdownDiv = document.createElement("div");
//     dropdownDiv.className = "dropdown";
//     let sortOption1 = document.createElement("a");
//     sortOption1.href = "#";
//     dropdownDiv.appendChild(sortOption1);
//     sortOptions().appendChild(dropdownDiv);
//   })
// }

//Initialize
function initialize() {
  getUsers().then(json => {
    json.forEach(userData => {
      let user = new User(userData);
    });
  });
  loginFormListener();
  projectButtonListener();
  //  sortButtonListener();
}

document.addEventListener("DOMContentLoaded", initialize);
