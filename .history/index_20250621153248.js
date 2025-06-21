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
    
    assignBook(bookId,member,library){
        const book = library.findBook(bookId)
        if(book && book.borrow()){
            member.borrowBook(bookId)
            console.log(`${member.name} is borrowed ${book.title}`)
        }
        else{
            console.log('Book is not available')
        }
    }

    returnAccept(bookId,member,library){
        const book = library.findBook(bookId)

        if(book){
            book.return()
            member.returnBook(bookId)
            console.log(`${member.name} is returned the book ID: ${book.title}`)
        }
        else{
            console.log('Book not found')
        }
    }

    getDetails(){
        console.log(`Librarian ${this.name} and ID: ${this.id}`)
    }
}

class Book{
    constructor(id,title,author,quantity){
        this.id=id
        this.title=title
        this.author=author
        this.quantity=quantity
        this.availableQuantity=quantity
    }

    borrow(){
        if(this.availableQuantity>0){
            this.availableQuantity--
            return true
        }
        else{
            return false
        }
    }

    return(){
        if(this.availableQuantity<this.quantity){
            this.availableQuantity++
            return true
        }
        else{
            retu
        }
    }
}
