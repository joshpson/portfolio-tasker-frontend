class User{
  constructor(object){
    this.id = object.id
    this.usernmae = object.username

    User.all.push(this)
  }
}

User.all = []