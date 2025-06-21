class User {
  constructor(id, name) {
    if (new.target === User) {
      throw new Error();
    }
    this.id = id;
    this.name = name;
    return `User: ${this.name}, ID: ${this.id}`;
  }
 
}

class Member extends User {
  constructor(id, name) {}
}
