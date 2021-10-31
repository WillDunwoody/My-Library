let myLibrary = []

function Book(title, author, totalPages, readStatus) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.read = readStatus;
}

function addBookToLibrary(title, author, totalPages, readStatus) {
    let newBook = new Book(title, author, totalPages, readStatus)
    myLibrary.push(newBook)
}

const submitBook = document.getElementById("submitBook")
const inputs = document.querySelectorAll("input")
const addBook = document.getElementById("addBook")
const addBookForm = document.getElementById("addBookForm")
const container = document.querySelector(".container")

addBook.addEventListener("click", function() {
    addBookForm.classList.add('active')
})

submitBook.addEventListener("click", function() {
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let totalPages = document.getElementById("totalPages").value
    let readStatus = document.getElementById("readStatus").value
    let newBook = new Book(title, author, totalPages, readStatus)
    myLibrary.push(newBook)
    inputs.forEach(input => input.value = '')
    addBookForm.classList.remove('active')
    createCard()
})

function createCard() {
    for (let books of myLibrary) {
        let newCard = document.createElement('div')
        let title = document.createElement('h3')
        let author = document.createElement('h3')
        let totalPages = document.createElement('h3')
        let readStatus = document.createElement('h3')
        newCard.classList.add('bookCard')
        
        container.appendChild(newCard)
        newCard.appendChild(title)
        newCard.appendChild(author)
        newCard.appendChild(totalPages)
        newCard.appendChild(readStatus)

        title.textContent = books.title
        author.textContent = books.author
        totalPages.textContent = books.totalPages
        readStatus.textContent = books.readStatus
    }
}