class Project {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.status = obj.status;
    this.tasks = this.createTasks(obj);
    Project.all.push(this);
  }

  createTasks(obj) {
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
    card.className = " mdl-card mdl-shadow--2dp dropzone";
    card.appendChild(this.titleHeader());
    card.appendChild(this.tasksUl());
    card.appendChild(this.newTaskForm());
    card.appendChild(this.removeDivButton(card));
    card.addEventListener("dragenter", e => projectDragEnter(e), false);
    card.addEventListener("dragleave", e => projectDragLeave(e), false);
    card.addEventListener("dragover", e => projectDragOver(e), false);
    card.addEventListener("drop", e => taskDrop(e, this), false);
    containerDiv.appendChild(card);
    projectContainer().appendChild(containerDiv);
    componentHandler.upgradeElements(containerDiv);
  }

  removeDivButton(div) {
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "mdl-card__actions mdl-card--border";
    let remove = document.createElement("BUTTON");
    remove.className =
      "mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
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
    let cardButton = document.createElement("button");
    cardButton.id = `demo-menu-lower-right-project-${this.id}`;
    cardButton.className = "mdl-button mdl-js-button mdl-button--icon";
    let cardI = document.createElement("i");
    cardI.className = "material-icons";
    cardI.innerText = "more_vert";
    h2.className = "mdl-card__title-text mdl-card--border";
    h2.innerText = this.title;
    h2.addEventListener("dblclick", () => {
      h2.setAttribute("contenteditable", "true");
    });
    h2.addEventListener("blur", () => {
      this.updateTitle(h2);
    });
    containerDiv.appendChild(h2);
    cardButton.appendChild(cardI);
    containerDiv.appendChild(cardButton);
    containerDiv.appendChild(this.buttonDropdown());
    return containerDiv;
  }

  buttonDropdown() {
    let buttonUl = document.createElement("ul");
    buttonUl.className =
      "mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect";
    buttonUl.setAttribute("for", `demo-menu-lower-right-project-${this.id}`);
    let buttonLiAlpha = document.createElement("li");
    buttonLiAlpha.addEventListener("click", e => {
      console.log("project", this);
      this.sortTasksAlphabetically();
      this.appendTasks();
    });
    buttonLiAlpha.className = "mdl-menu__item";
    buttonLiAlpha.innerText = "sort a-z";
    buttonUl.appendChild(buttonLiAlpha);
    let buttonLiCompleted = document.createElement("li");
    buttonLiCompleted.addEventListener("click", e => {
      console.log("project", this);
      this.completedTasks();
    });
    buttonLiCompleted.className = "mdl-menu__item";
    buttonLiCompleted.innerText = "completed";
    buttonUl.appendChild(buttonLiCompleted);
    return buttonUl;
  }

  tasksUl() {
    let ul = document.createElement("ul");
    ul.setAttribute("id", `project-${this.id}-ul`);
    ul.setAttribute("data-projectid", this.id);
    ul.className = "mdl-list task-ul";
    return ul;
  }

  appendTasks() {
    let ul = document.getElementById(`project-${this.id}-ul`);
    ul.innerHTML = "";
    this.tasks.forEach(function(task) {
      if (task.status != "Completed") {
        task.append(ul);
      }
    });
  }

  completedTasks() {
    let ul = document.getElementById(`project-${this.id}-ul`);
    ul.innerHTML = "";
    this.tasks.forEach(function(task) {
      if (task.status === "Completed") {
        task.append(ul);
      }
    });
  }

  sortTasksAlphabetically() {
    this.tasks.sort(function(a, b) {
      if (a.description.toUpperCase() < b.description.toUpperCase()) return -1;
      if (a.description.toUpperCase() > b.description.toUpperCase()) return 1;
      return 0;
    });
  }

  updateTitle(element) {
    element.setAttribute("contenteditable", "false");
    this.title = element.innerText;
    patchProject(this);
  }

  newTaskForm() {
    let formDiv = document.createElement("div");
    formDiv.className = "mdl-card__supporting-text";
    let form = document.createElement("form");
    formDiv.appendChild(form);
    let div = document.createElement("div");
    div.className =
      "mdl-textfield mdl-js-textfield mdl-textfield--floating-label";
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Create New Task...";
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
