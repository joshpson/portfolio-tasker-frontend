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

function hideProjectButton() {
  projectButton().style.display = "none";
}

function revealProjectButton() {
  projectButton().style.display = "";
}

function hideLoginFormDiv() {
  loginFormDiv().style.display = "none";
}

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

//Initialize
function initialize() {
  hideProjectButton();
  getUsers().then(json => {
    json.forEach(userData => {
      let user = new User(userData);
    });
  });
  loginFormListener();
  projectButtonListener();
}

document.addEventListener("DOMContentLoaded", initialize);
