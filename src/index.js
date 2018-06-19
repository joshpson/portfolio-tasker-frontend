console.log("Index.js loaded");

let currentUser;

function projectContainer() {
  return document.getElementById("projects");
}

function projectFormContainer() {
  return document.getElementById("new-project");
}

function patchProject(project) {
  fetch(`http://localhost:3000/api/v1/projects/${project.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(project)
  })
    .then(res => res.json())
    .then(json => console.log(json));
}

function patchTask(task) {
  fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })
    .then(res => res.json())
    .then(json => console.log(json));
}

function postTask(data) {
  return fetch(`http://localhost:3000/api/v1/tasks/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function getProject(projId) {
  fetch(`http://localhost:3000/api/v1/projects/${projId}`)
    .then(res => res.json())
    .then(json => {
      let project = new Project(json);
      project.renderDiv();
      project.appendTasks();
    });
}

function getUsers() {
  fetch("http://localhost:3000/api/v1/users")
    .then(res => res.json())
    .then(json => {
      json.forEach(userData => {
        let user = new User(userData);
      });
    });
}

function postProject(data) {
  return fetch(`http://localhost:3000/api/v1/projects/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function postUserProject(data) {
  fetch(`http://localhost:3000/api/v1/userprojects/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function addNewProjectForm() {
  let form = document.createElement("form");
  let input = document.createElement("input");
  input.type = "text";
  form.addEventListener("submit", e => {
    e.preventDefault();
    let data = {
      title: input.value
    };
    postProject(data)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        let project = new Project(json);
        let userProjectData = {
          project_id: json.id,
          user_id: currentUser.id
        };
        postUserProject(userProjectData);
        project.renderDiv();
        project.appendTasks();
      });
    form.reset();
  });
  form.appendChild(input);
  projectFormContainer().appendChild(form);
}

function loginData() {
  return document.querySelector('input[name="username"]').value;
}

function findUser() {
  return User.all.find(function(user) {
    return user.username === loginData();
  });
}

function hideLoginForm() {
  document.getElementById("login-form").style.display = "none";
}

function loginFormListener() {
  let loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    currentUser = findUser();
    if (currentUser) {
      hideLoginForm();
    }
    currentUser.initializeProjects();
    addNewProjectForm();
    loginForm.reset();
    console.log(currentUser);
  });
}

function initialize() {
  getUsers();
  loginFormListener();
}

document.addEventListener("DOMContentLoaded", initialize);

// function postUser(data) {
//   fetch("http://localhost:3000/api/v1/users", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//     .then(res => res.json())
//     .then(json => new User(json));
// }
