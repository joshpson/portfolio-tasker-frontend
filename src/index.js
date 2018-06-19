console.log("Index.js loaded");

let currentUser;

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

function postTask(data, project) {
  fetch(`http://localhost:3000/api/v1/tasks/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => {
      let task = new Task(json);
      project.tasks.push(task);
      project.appendTasks();
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

function loginData() {
  return document.querySelector('input[name="username"]').value;
}

function findUser() {
  return User.all.find(function(user) {
    return user.username === loginData();
  });
}

function setLoginFormListener() {
  let loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let user = findUser();
    user.initializeProjects();
    loginForm.reset();
    console.log(user);
    currentUser = user;
  });
}

function initialize() {
  getUsers();
  setLoginFormListener();
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
