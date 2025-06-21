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
  borrowedBook(bookId){
    this.borrowedBook.push(bookId)
  }
  returnBook(bookId){
    this.borrowedBook = this.borrowedBook.filter(id=>id!==bookId)
  }

  getDetails(){
    const borrowedBooks = 'No bortowed books'
    if(this.borrowedBook.length>0){
      const borrowedBooks = this.borrowedBook.join(',')
    }
    console.log(`User: ${this.name}, ID: ${this}`)
  }
}
