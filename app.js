let myLibrary = []

function Book(title, author, totalPages, read) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.read = read;
    this.info = function() {
        return (title, author, totalPages, read)
    }
}

function addBookToLibrary(title, author, totalPages, read) {
    let newBook = new Book(title, author, totalPages, read)
    myLibrary.push(newBook)
}




let hobbit = addBookToLibrary("hobbit", "jrr", 200, 250, "YES")
let bible = addBookToLibrary("Bible", "God", 900, 320, "No" )


console.log(myLibrary)