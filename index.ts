abstract class User {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    if (new.target === User) {
      throw new Error("Error");
    }
    this.id = id;
    this.name = name;
  }
  abstract getDetails(): void;
}

class Member extends User {
  borrowedBooks: string[];
  constructor(id: string, name: string) {
    super(id, name);
    this.borrowedBooks = [];
  }
  borrowBook(bookId: string) {
    if (this.borrowedBooks.includes(bookId)) {
      console.log(`Already borrowed this book ID: ${bookId}`);
    } else {
      this.borrowedBooks.push(bookId);
    }
  }
  returnBook(bookId: string) {
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
  constructor(id: string, name: string) {
    super(id, name);
  }

  addBook(book: Book, library: Library) {
    library.addBook(book);
  }

  addMember(member: Member, library: Library) {
    library.registerMember(member);
    console.log(`Name: ${member.name} ID: ${member.id} registered as a member`);
  }

  assignBook(bookId: string, member: Member, library: Library): void {
    const book = library.findBook(bookId);
    if (book && book.borrow()) {
      member.borrowBook(bookId);
      console.log(`${member.name} is borrowed ${book.title}`);
    } else {
      console.log("Book is not available");
    }
  }

  returnAccept(bookId: string, member: Member, library: Library) {
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
  id: string;
  title: string;
  author: string;
  quantity: number;
  availableQuantity: number;
  constructor(id: string, title: string, author: string, quantity: number) {
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
      `Book: ${this.title} by ${this.author}, (ISBN: ${this.id}), ${this.availableQuantity}/${this.quantity} available`
    );
  }
}

class Library {
  books: Book[];
  members: Member[];
  librarians: Librarian[];

  constructor() {
    this.books = [];
    this.members = [];
    this.librarians = [];
    console.log("Library started");
  }

  addBook(book: Book): void {
    const inBooks = this.books.find((b) => b.id === book.id);
    if (!inBooks) {
      this.books.push(book);
      console.log(
        `Book: ${book.title} by ${book.author} is added successfully`
      );
    } else {
      console.log(`Book: ${book.title} by ${book.author} is already added`);
    }
  }

  registerMember(member: Member): void {
    const inMember = this.members.find((m) => m.id === member.id);
    if (!inMember) {
      this.members.push(member);
      console.log(
        `Name: ${member.name}, ID: ${member.id} is registered successfully`
      );
    } else {
      console.log(
        `Name: ${member.name}, ID: ${member.id} is already registered`
      );
    }
  }

  registerLibrarian(librarian: Librarian) {
    const inLibrarian = this.librarians.find((l) => l.id === librarian.id);
    if (!inLibrarian) {
      this.librarians.push(librarian);
      console.log(
        `Name: ${librarian.name}, ID: ${librarian.id} is added as a librarian`
      );
    } else {
      console.log(
        `Name: ${librarian.name}, ID: ${librarian.id} is already a librarian`
      );
    }
  }

  findBook(bookId: string) {
    return this.books.find((book) => book.id === bookId);
  }

  listAllBooks() {
    console.log("Books in Library:");
    if (this.books.length > 0) {
      this.books.forEach((book) => book.getDetails());
    } else {
      console.log("No books in library");
    }
  }

  listAllMembers() {
    console.log("Registered Members:");
    if (this.members.length > 0) {
      this.members.forEach((member) => member.getDetails());
    } else {
      console.log("No members registered");
    }
  }

  listAllLibrarians() {
    console.log("Librarians:");
    if (this.librarians.length > 0) {
      this.librarians.forEach((librarian) => librarian.getDetails());
    } else {
      console.log("No librarians found");
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

l1.returnAccept("101", m1, lib);

lib.listAllBooks();
lib.listAllMembers();
lib.listAllLibrarians();

lib.shutdown();
