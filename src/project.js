class Project{
  constructor(object){
    this.id = object.id
    this.title = object.title
    this.description = object.description
    this.status = object.status

    Project.all.push(this)
  }
}

Project.all = []