function allowDrop(e) {
  e.preventDefault();
}

function taskDrag(e) {
  e.dataTransfer.setData("elementid", e.target.id);
  e.dataTransfer.setData("taskid", e.target.dataset.taskid);
}

function taskDrop(e) {
  e.preventDefault();
  if (e.target.classList.contains("dropzone")) {
    let listItemId = e.dataTransfer.getData("elementid");
    e.target.appendChild(document.getElementById(listItemId));
    console.log(e.dataTransfer.getData("taskid"));
    let task = Task.all.find(function(task) {
      return task.id === parseInt(e.dataTransfer.getData("taskid"));
    });
    task.project_id = parseInt(e.target.dataset.projectid);
    patchTask(task);
  }
}
