class User {
  constructor(id, name) {
    if (new.target === User) {
      throw new Error();
    }
    this.id = id;
    this.name = name;
  }
 
}

class Member extends User {
  constructor(id, name) {
    super(id, name)
    this.borrowedBooks=[]
  }
  borrowedBooks(bookId){
    this.borrowedBooks.pus
  }
}
