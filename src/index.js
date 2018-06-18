console.log("Index.js loaded");

function fetchProject() {
  fetch(`http://localhost:3000/api/v1/projects`)
  .then(res => res.json())
  .then(json => {
    json.forEach(project => {
      let currentProject = new Project(project)
      currentProject.render()
    });
  });
}
