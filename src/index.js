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

function projectForm() {
  return document.querySelector("#project-form");
}

function projectFormDiv() {
  return document.querySelector("#new-project-form-div");
}

function projectData() {
  return document.querySelector('input[name="project"]').value;
}

function hideLoginFormDiv() {
  loginFormDiv().style.display = "none";
}

function displayProjectFormDiv() {
  projectFormDiv().style.display = "block";
}

//Event Listeners

function loginFormListener() {
  loginForm().addEventListener("submit", function(e) {
    e.preventDefault();
    User.login();
  });
}

function projectFormListener() {
  projectForm().addEventListener("submit", e => {
    e.preventDefault();
    let data = {
      title: projectData()
    };
    postProject(data).then(json => {
      let project = new Project(json);
      let userProjectData = {
        project_id: json.id,
        user_id: currentUser.id
      };
      postUserProject(userProjectData);
      project.renderDiv();
      project.appendTasks();
    });
    projectForm().reset();
  });
}

//Initialize
function initialize() {
  getUsers().then(json => {
    json.forEach(userData => {
      let user = new User(userData);
    });
  });
  loginFormListener();
  projectFormListener();
}

document.addEventListener("DOMContentLoaded", initialize);
