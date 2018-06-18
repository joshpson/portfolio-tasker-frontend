class Task{
  constructor(object) {
    this.id = object.id
    this.user_id = object.user_id
    this.project_id = object.project_id
    this.due_date = object.due_date
    this.description = object.description
    this.status = object.status

    Task.all.push(this)
  }

  
}

Task.all = []