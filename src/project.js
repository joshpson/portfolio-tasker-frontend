class Project {
  constructor(object) {
    this.id = object.id;
    this.title = object.title;
    this.description = object.description;
    this.status = object.status;
    this.tasks = object.tasks;

    Project.all.push(this);
  }

  projectElement() {
    let div = document.createElement("div");
    div.innerHTML = `
    <h1>${this.title}</h1>
    <h3>${this.description}<h3>
    `;
    return div;
  }

  render() {
    let projectDiv = document.getElementById("projects");
    projectDiv.appendChild(this.projectElement());
  }

  createTasks() {
    this.tasks.forEach(function(taskData) {
      let task = new Task(taskData);
      let projectDiv = document.getElementById("projects");
      projectDiv.appendChild(task.createDiv());
    });
  }
}

Project.all = [];
