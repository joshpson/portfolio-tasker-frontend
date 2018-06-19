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
    let h4 = document.createElement("h4");
    h4.innerText = this.description;
    h4.addEventListener("dblclick", () => {
      h4.setAttribute("contenteditable", "true");
    });
    h4.addEventListener("blur", () => {
      this.updateDescription(h4);
    });
    li.appendChild(h4);
    return li;
  }

  updateDescription(element) {
    element.setAttribute("contenteditable", "false");
    this.description = element.innerText;
    patchTask(this);
  }
}

Task.all = [];
