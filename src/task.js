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

  createElement() {
    let div = document.createElement("div");
    div.innerHTML = `
    <p><strong>${this.description}</strong></p>
    <p>Due Date: ${this.due_date}<p>
    `;
    return div;
  }
}

Task.all = [];
