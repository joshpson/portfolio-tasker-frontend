console.log("Index.js loaded");

function fetchProjects() {
  fetch(`http://localhost:3000/api/v1/projects`)
    .then(res => res.json())
    .then(json => {
      json.forEach(project => {
        let currentProject = new Project(project);
        currentProject.render();
        currentProject.createTasks();
      });
    });
}

function initialize() {
  fetchProjects();
}

document.addEventListener("DOMContentLoaded", initialize);
