let myLibrary = []

function Book(title, author, totalPages, completedPages, read) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.completedPages = completedPages;
    this.read = read;
}

function AddBookToLibrary(title, author, totalPages, completedPages, read) {
    let newBook = new Book(title, author, totalPages, completedPages, read)
    myLibrary.push(newBook)
}




let hobbit = AddBookToLibrary("hobbit", "jrr", 200, 250, "YES")
let bible = AddBookToLibrary("Bible", "God", 900, 320, "No" )




console.log(myLibrary[0])