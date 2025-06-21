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
  borrowBook(bookId){
    this.borrowedBooks.push(bookId)
  }
  returnBooks(bookId){
    this.borrowedBooks = this.borrowedBooks.filter(id=>id!==bookId)
  }

  getDetails(){
    let borrowed = 'No borrowed books'
    if(this.borrowedBooks.length>0){
      borrowed = this.borrowedBooks.join(',')
    }
    console.log(`User: ${this.name}, ID: ${this.id} | Borrowed books: ${borrowed}`)
  }
}

class Librarian extends User{
    constructor(id,name){
        super(id,name)
    }
    
    addBook(book,library){
        library.addBook(book)
    }

    addMember(member,library){
        library.regitermember(member)
        console.log(`member Registered Name: ${member.name} ID: ${member.id}`)
    }
    
    assign
}
