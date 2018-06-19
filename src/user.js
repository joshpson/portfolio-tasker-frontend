class User {
  constructor(obj) {
    this.id = obj.id;
    this.username = obj.username;
    this.projects = obj.projects;
    User.all.push(this);
  }

  initializeProjects() {
    this.projects.forEach(function(project) {
      getProject(project.id);
    });
  }
}

User.all = [];
