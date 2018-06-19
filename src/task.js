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

  createDiv() {
    let div = document.createElement("div");
    div.innerHTML = `
    <p>${this.description}</p>
    <p>${this.due_date}<p>
    `;
    return div;
  }
}

Task.all = [];
