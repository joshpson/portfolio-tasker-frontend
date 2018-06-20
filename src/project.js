class Project {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.status = obj.status;
    this.tasks = this.createTasks(obj);
    Project.all.push(this);
  }

  createTasks(obj){
    let taskArray = [];
    obj.tasks.forEach(function(taskData) {
      let task = new Task(taskData);
      taskArray.push(task);
    });
    return taskArray;
  }

  renderDiv() {
    let containerDiv = document.createElement("div");
    containerDiv.className = "mdl-cell mdl-cell--4-col";
    let card = document.createElement("div");
    card.setAttribute("id", `project-${this.id}-div`);
    card.className = "demo-card-wide mdl-card mdl-shadow--2dp";
    card.appendChild(this.titleHeader());
    card.appendChild(this.tasksUl());
    card.appendChild(this.newTaskForm());
    card.appendChild(this.removeDivButton(card));
    containerDiv.appendChild(card);
    projectContainer().appendChild(containerDiv);
  }

  removeDivButton(div) {
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "mdl-card__actions";
    let remove = document.createElement("BUTTON");
    remove.className = "mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
    remove.innerText = "Delete";
    remove.addEventListener("click", e => {
      deleteProject(this);
      div.remove();
    });
    buttonDiv.appendChild(remove);
    return buttonDiv;
  }

  titleHeader() {
    let containerDiv = document.createElement("div");
    containerDiv.className = "mdl-card__title";
    let h2 = document.createElement("h2");
    h2.className = "mdl-card__title-text";
    h2.innerText = this.title;
    h2.addEventListener("dblclick", () => {
      h2.setAttribute("contenteditable", "true");
    });
    h2.addEventListener("blur", () => {
      this.updateTitle(h2);
    });
    containerDiv.appendChild(h2);
    return containerDiv;
  }

  tasksUl() {
    let ul = document.createElement("ul");
    ul.addEventListener("dragover", function(e) {
      e.preventDefault();
      console.log("dragover");
    });
    ul.addEventListener("drop", function(e) {
      taskDrop(e);
    });
    ul.setAttribute("id", `project-${this.id}-ul`);
    ul.setAttribute("data-projectid", this.id);
    ul.className = "mdl-list dropzone dragenter";
    return ul;
  }

  appendTasks() {
    let ul = document.getElementById(`project-${this.id}-ul`);
    ul.innerHTML = "";
    this.tasks.forEach(function(task) {
      if(task.status != "Completed"){
        task.append(ul);
      }
    });
  }

  updateTitle(element) {
    element.setAttribute("contenteditable", "false");
    this.title = element.innerText;
    patchProject(this);
  }

  newTaskForm() {
    let formDiv = document.createElement("div")
    formDiv.className = "mdl-card__menu"
    let form = document.createElement("form");
    formDiv.appendChild(form)
    let div = document.createElement("div")
    div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Create New Task..."
    input.className = "mdl-textfield__input";
    form.appendChild(div);
    div.appendChild(input);
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
    return formDiv;
  }
}

Project.all = [];
