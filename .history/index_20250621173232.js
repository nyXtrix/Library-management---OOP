class User {
  constructor(id, name) {
    if (new.target === User) {
      throw new Error("Error");
    }
    this.id = id;
    this.name = name;
  }
}

class Member extends User {
  constructor(id, name) {
    super(id, name);
    this.borrowedBooks = [];
  }
  borrowBook(bookId) {
    if (this.borrowedBooks.includes(bookId)) {
      console.log(`Already borrowed this book ID: ${bookId}`);
    } else {
      this.borrowedBooks.push(bookId);
    }
  }
  returnBook(bookId) {
    this.borrowedBooks = this.borrowedBooks.filter((id) => id !== bookId);
  }

  getDetails() {
    let borrowed = "No borrowed books";
    if (this.borrowedBooks.length > 0) {
      borrowed = this.borrowedBooks.join(",");
    }
    console.log(
      `User: ${this.name}, ID: ${this.id} and Borrowed books are: ${borrowed}`
    );
  }
}

class Librarian extends User {
  constructor(id, name) {
    super(id, name);
  }

  addBook(book, library) {
    library.addBook(book);
  }

  addMember(member, library) {
    library.regiterMember(member);
    console.log(`Name: ${member.name} ID: ${member.id} registered as a member`);
  }

  assignBook(bookId, member, library) {
    const book = library.findBook(bookId);
    if (book && book.borrow()) {
      member.borrowBook(bookId);
      console.log(`${member.name} is borrowed ${book.title}`);
    } else {
      console.log("Book is not available");
    }
  }

  returnAccept(bookId, member, library) {
    const book = library.findBook(bookId);

    if (book) {
      book.return();
      member.returnBook(bookId);
      console.log(`${member.name} is returned the book ID: ${book.title}`);
    } else {
      console.log("Book not found");
    }
  }

  getDetails() {
    console.log(`Librarian ${this.name} and ID: ${this.id}`);
  }
}

class Book {
  constructor(id, title, author, quantity) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.quantity = quantity;
    this.availableQuantity = quantity;
  }

  borrow() {
    if (this.availableQuantity > 0) {
      this.availableQuantity--;
      return true;
    } else {
      return false;
    }
  }

  return() {
    if (this.availableQuantity < this.quantity) {
      this.availableQuantity++;
      return true;
    } else {
      return false;
    }
  }

  getDetails() {
    console.log(
      `${this.title} by ${this.author}, (ISBN: ${this.id}), ${this.availableQuantity}/${this.quantity} available`
    );
  }
}

class Library {
  constructor() {
    this.books = [];
    this.members = [];
    this.libraians = [];
    console.log("Library started");
  }

  addBook(book) {
    const inBooks = this.books.find((b) => b.id === book.id);
    if (!inBooks) {
      this.books.push(book);
      console.log(`Book: ${book.title} by ${book.author} is added succesfully`);
    } else {
      console.log(`B${book.title} by ${book.author} is already added`);
    }
  }

  regiterMember(member) {
    const inMember = this.members.find((m) => m.id === member.id);
    if (!inMember) {
      this.members.push(member);
      console.log(
        `Name: ${member.name},ID: ${member.id} is regitered succesfully`
      );
    } else {
      console.log(
        `Name: ${member.name}, ID: ${member.id} is already regitered`
      );
    }
  }

  registerLibrarian(libraian) {
    const inLibrarian = this.libraians.find((l) => l.id === libraians.id);
    if (!inLibrarian) {
      this.libraians.push(libraian);
      console.log(
        `Name: ${libraian.name}, ID: ${libraian.id} is added as a librarian`
      );
    } else {
      console.log(
        `Name: ${libraian.name}, ID: ${libraian.id} is already librarian`
      );
    }
  }

  findBook(bookId) {
    return this.books.find((book) => book.id === bookId);
  }

  listAllBooks() {
    console.log("Books in Library: ");
    if (this.books.length === 0) {
      console.log("No books in library");
    } else {
      this.books.forEach((book) => book.getDetails());
    }
  }

  listAllMembers() {
    console.log("Regitered Members are: ");

    if (this.members.length === 0) {
      console.log("No members registered");
    } else {
      this.members.forEach((member) => member.getDetails());
    }
  }

  listAllLibrarians() {
    console.log("This library librarian are:");

    if (this.libraians.length === 0) {
      console.log("No librarians are found");
    } else {
      this.libraians.forEach((librarian) => librarian.getDetails());
    }
  }

  shutdown() {
    console.log("Library is shutdown");
  }
}

const lib = new Library();

const l1 = new Librarian("L001", "Sophia");
lib.registerLibrarian(l1);

const b1 = new Book("101", "JS Mastery", "Kyle Simpson", 3);
l1.addBook(b1, lib);

const b2 = new Book("102", "Clean Code", "Robert Martin", 2);
l1.addBook(b2, lib);

const m1 = new Member("M001", "Alice");
l1.addMember(m1, lib);

const m2 = new Member("M002", "Bob");
l1.addMember(m2, lib);

l1.assignBook("101", m1, lib);
l1.assignBook("102", m2, lib);
l1.assignBook("101", m2, lib);
l1.assignBook("101", m1, lib);

l1.returnAccept("101", m1, lib);

lib.listAllBooks();
lib.listAllMembers();
lib.listAllLibrarians();

lib.shutdown();
