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
    let checkBox = document.createElement("input");
    checkBox.className = "mdl-checkbox__input mdl-js-ripple-effect";
    checkBox.type = "checkbox";
    checkBox.addEventListener("change", e => {
      this.status = "Completed";
      li.remove();
      patchTask(this);
    });
    return checkSpan.appendChild(checkBox);
  }

  //Update list item descriptions
  updateDescription(element) {
    element.setAttribute("contenteditable", "false");
    this.description = element.innerText;
    patchTask(this);
  }
}

Task.all = [];
