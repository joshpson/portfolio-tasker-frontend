class Project {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.status = obj.status;
    this.tasks = obj.tasks;
    Project.all.push(this);
  }

  projectElement() {
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    h1.innerText = this.title;
    h1.addEventListener("dblclick", function() {
      h1.setAttribute("contenteditable", "true");
    });
    h1.addEventListener("blur", function() {
      h1.setAttribute("contenteditable", "false");
    });

    div.appendChild(h1);
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
