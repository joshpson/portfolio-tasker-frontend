class Project {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.status = obj.status;
    this.tasks = obj.tasks;
    Project.all.push(this);
  }

  renderDiv() {
    let div = document.createElement("div");
    div.appendChild(this.titleHeader());
    div.appendChild(this.tasksUl());
    div.appendChild(this.newTaskForm());
    projectContainer().appendChild(div);
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

  tasksUl() {
    let ul = document.createElement("ul");
    ul.setAttribute("id", `project-${this.id}`);
    return ul;
  }

  appendTasks() {
    let ul = document.getElementById(`project-${this.id}`);
    ul.innerHTML = "";
    this.tasks.forEach(function(taskData) {
      let task = new Task(taskData);
      task.append(ul);
    });
  }

  updateTitle(element) {
    element.setAttribute("contenteditable", "false");
    this.title = element.innerText;
    patchProject(this);
  }

  newTaskForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    input.type = "text";
    form.addEventListener("submit", e => {
      e.preventDefault();
      let data = {
        description: input.value,
        project_id: this.id,
        user_id: currentUser.id
      };
      postTask(data).then(json => {
        let task = new Task(json);
        this.tasks.push(task);
        this.appendTasks();
      });
      form.reset();
    });
    form.appendChild(input);
    return form;
  }
}

Project.all = [];
