function allowDrop(e) {
  e.preventDefault();
}

function projectDragEnter(e) {
  if (e.target.classList.contains("dropzone")) {
    e.target.classList.add("highlight");
  }
}

function projectDragLeave(e) {
  if (e.target.classList.contains("dropzone")) {
    e.target.classList.remove("highlight");
  }
}

function projectDragOver(e) {
  e.preventDefault();
}

function taskDrag(e) {
  e.dataTransfer.setData("elementid", e.target.id);
  e.dataTransfer.setData("taskid", e.target.dataset.taskid);
}

function taskDrop(e, project) {
  if (e.target.classList.contains("dropzone")) {
    e.target.classList.remove("highlight");
    let taskElement = document.getElementById(
      e.dataTransfer.getData("elementid")
    );
    let projectUl = document.getElementById(`project-${project.id}-ul`);
    projectUl.appendChild(taskElement);
    let task = Task.all.find(function(task) {
      return task.id === parseInt(e.dataTransfer.getData("taskid"));
    });
    task.project_id = project.id;
    patchTask(task);
  }
}
