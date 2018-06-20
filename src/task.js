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
    element.appendChild(this.listElement());
  }

  listElement() {
    let li = document.createElement("li");
    li.id = `list-item-${this.id}`;
    li.setAttribute("data-taskid", this.id);
    li.className = "mdl-list__item";
    li.draggable = "true";
    li.addEventListener("dragstart", function(e) {
      taskDrag(e);
    });
    let span = document.createElement("span");
    span.className = "mdl-list__item-primary-content";
    span.innerText = this.description;
    span.addEventListener("dblclick", () => {
      span.setAttribute("contenteditable", "true");
    });
    span.addEventListener("blur", () => {
      this.updateDescription(span);
    });
    li.appendChild(span);
    li.appendChild(this.checkBoxSpan(li));
    return li;
  }

  checkBoxSpan(li) {
    let checkSpan = document.createElement("span");
    checkSpan.className = "mdl-list__item-secondary-action";
    let checkBox = document.createElement("input");
    checkBox.className = "mdl-checkbox__input mdl-js-ripple-effect";
    checkBox.type = "checkbox";
    checkBox.addEventListener("change", (e) => {
      this.status = "Completed";
      console.log(this);
      li.remove();
      patchTask(this);
    })
    return checkSpan.appendChild(checkBox);
  }

  updateDescription(element) {
    element.setAttribute("contenteditable", "false");
    this.description = element.innerText;
    patchTask(this);
  }
}

Task.all = [];
