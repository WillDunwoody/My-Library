let myLibrary = []

function Book(title, author, totalPages, readStatus) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readStatus = readStatus;
}

const addBook = document.getElementById("addBook")
const addBookForm = document.getElementById("addBookForm")
const submitBook = document.getElementById("submitBook")
const inputs = document.querySelectorAll("input")
const bookContainer = document.querySelector(".container")

addBook.addEventListener("click", function() {
    addBookForm.classList.add('active')
})

submitBook.addEventListener("click", function() {
    checkInputs()
})

function getInputs() {
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let totalPages = document.getElementById("totalPages").value
    let readStatus = document.getElementById("readStatus").value
    
    addBookToLibrary(title, author, totalPages, readStatus)
}

function checkInputs() {
    console.log(inputs)
    inputs.forEach(input =>  {
        if(input.value === '') {
            input.value = 'This is blank'
        }
    })
}

function addBookToLibrary(title, author, totalPages, readStatus) {
    let newBook = new Book(title, author, totalPages, readStatus)
    myLibrary.push(newBook)
    createCard()
    clearInputs()
}

function clearInputs() {
    inputs.forEach(input => input.value = '')
    addBookForm.classList.remove('active')
}

function createCard() {
    clearBookCards()
    for (let books of myLibrary) {

        let newCard = document.createElement('div')
        let title = document.createElement('h2')
        let author = document.createElement('h3')
        let totalPages = document.createElement('h4')
        let readStatus = document.createElement('h4')
        newCard.classList.add('bookCard')
        
        bookContainer.appendChild(newCard)
        newCard.appendChild(title)
        newCard.appendChild(author)
        newCard.appendChild(totalPages)
        newCard.appendChild(readStatus)

        title.textContent = books.title
        author.textContent = "by " + books.author
        totalPages.textContent = books.totalPages
        readStatus.textContent = books.readStatus
    }
}

function clearBookCards() {
    while (bookContainer.lastChild) {
        bookContainer.removeChild(bookContainer.lastChild)
    }
}
