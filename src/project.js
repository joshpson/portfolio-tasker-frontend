class Project {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.status = obj.status;
    this.tasks = obj.tasks;
    Project.all.push(this);
  }

  div() {
    let div = document.createElement("div");
    div.appendChild(this.titleHeader());
    this.appendTasks(div);
    return div;
  }

  titleHeader() {
    let h1 = document.createElement("h1");
    h1.innerText = this.title;
    h1.addEventListener("dblclick", () => {
      h1.setAttribute("contenteditable", "true");
    });
    h1.addEventListener("blur", () => {
      this.updateTitle(h1);
    });
    return h1;
  }

  appendTasks(element) {
    this.tasks.forEach(function(taskData) {
      let task = new Task(taskData);
      element.appendChild(task.createElement());
    });
  }

  renderDiv() {
    let projContainer = document.getElementById("projects");
    projContainer.appendChild(this.div());
  }

  updateTitle(element) {
    element.setAttribute("contenteditable", "false");
    this.title = element.innerText;
    postProject(this);
  }
}

Project.all = [];
