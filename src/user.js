class User{
  constructor(object){
    this.id = object.id
    this.username = object.username

    User.all.push(this)
  }
}

User.all = []