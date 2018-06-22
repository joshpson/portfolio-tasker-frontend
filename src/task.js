class Task {
  constructor(obj) {
    this.id = obj.id;
    this.user_id = obj.user_id;
    this.project_id = obj.project_id;
    this.due_date = obj.due_date;
    this.description = obj.description;
    this.status = obj.status;
    Task.all.push(this);
  }

  append(element) {
    element.appendChild(this.returnListElement());
    componentHandler.upgradeElements(element);
  }

  // Make list, add list items, make list items draggable

  returnListElement() {
    let li = document.createElement("li");
    li.id = `list-item-${this.id}`;
    li.setAttribute("data-taskid", this.id);
    li.className = "mdl-list__item";
    li.draggable = "true";
    li.addEventListener("dragstart", e => taskDrag(e), false);
    li.appendChild(this.returnLiSpan());
    li.appendChild(this.returnCheckBoxSpan(li));
    return li;
  }
  // Creating span element, make task editable
  returnLiSpan() {
    let span = document.createElement("span");
    span.className = "mdl-list__item-primary-content";
    span.innerText = this.description;
    span.addEventListener("dblclick", () => {
      span.setAttribute("contenteditable", "true");
    });
    span.addEventListener("blur", () => {
      this.updateDescription(span);
    });
    return span;
  }

  //Create checkboxes and mark items completed
  returnCheckBoxSpan(li) {
    let checkSpan = document.createElement("span");
    checkSpan.className = "mdl-list__item-secondary-action";
    let toggleLabel = document.createElement("label");
    toggleLabel.className = "mdl-switch mdl-js-switch mdl-js-ripple-effect";
    toggleLabel.setAttribute("for", `switch-1-task-${this.id}`);
    let checkBox = document.createElement("input");
    checkBox.id = `switch-1-task-${this.id}`;
    checkBox.className = "mdl-switch__input";
    checkBox.type = "checkbox";
    if(this.status === "Completed") {
      checkBox.checked = true;
    } else {
      checkBox.checked = false;
    }
    let toggleSpan = document.createElement("span");
    toggleSpan.className = "mdl-switch__label";
    toggleLabel.appendChild(toggleSpan);
    toggleLabel.appendChild(checkBox);
    checkBox.addEventListener("change", e => {
      console.log(e.target);
      if(e.target.checked === true){
        this.status = "Completed";
        this.project.appendActiveTasks();
      } else {
        this.status = "Active";
        this.project.appendCompletedTasks();
      }
      // this.status = "Completed";
      // patchTask(this);
      // li.remove();
    });
    return checkSpan.appendChild(toggleLabel);
  }

  //Update list item descriptions
  updateDescription(element) {
    element.setAttribute("contenteditable", "false");
    this.description = element.innerText;
    patchTask(this);
  }
}

Task.all = [];
