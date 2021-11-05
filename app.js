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
const inputs = document.querySelectorAll(".formInput")
const bookContainer = document.querySelector(".container")

addBook.addEventListener("click", function() {
    addBookForm.classList.add('active')
})

submitBook.addEventListener("click", function() {
    getInputs()
})

function getInputs() {
    inputs.forEach(input => input.classList.remove('error'))
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let totalPages = document.getElementById("totalPages").value
    let readStatus = document.getElementById("readStatus").checked

    checkInputs(title, author, totalPages, readStatus)
}

function checkInputs(title, author, totalPages, readStatus) {

    let checkInputsArr = [title, author, totalPages]
    let controlArr = []

    for(let i = 0; i < checkInputsArr.length; i++) {
        if(!checkInputsArr[i] == '') {
            controlArr.push(checkInputsArr[i])
        }
    }

    if(controlArr.length < 3) {
        inputs.forEach(input =>  {
            if(input.value === '') {
                input.classList.add('error')  
            }
        })
    } else {
        addBookToLibrary(title, author, totalPages, readStatus)
    }
}

function addBookToLibrary(title, author, totalPages, readStatus) {
    let newBook = new Book(title, author, totalPages, readStatus)
    myLibrary.push(newBook)
    createCard()
    clearInputs()
}

function clearInputs() {
    inputs.forEach(input => input.value = '')
    readStatus.checked = false
    addBookForm.classList.remove('active')
}

function createCard() {
    clearBookCards()
    for (let books of myLibrary) {

        let newCard = document.createElement('div')
        let title = document.createElement('div')
        let author = document.createElement('div')
        let totalPages = document.createElement('div')
        let cardFooter = document.createElement('div')
        let toggleButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        newCard.classList.add('bookCard')
        title.classList.add('title')
        author.classList.add('author')
        totalPages.classList.add('totalPages')
        cardFooter.classList.add('cardFooter')
        toggleButton.classList.add('toggleButton')
        deleteButton.classList.add('deleteButton')
        toggleButton.onclick = toggleRead
        deleteButton.onclick = deleteBook
        
        
        bookContainer.appendChild(newCard)
        newCard.appendChild(title)
        newCard.appendChild(author)
        newCard.appendChild(totalPages)
        newCard.appendChild(cardFooter)
        cardFooter.appendChild(toggleButton)
        cardFooter.appendChild(deleteButton)

        title.textContent = books.title
        author.textContent = "by " + books.author
        totalPages.textContent = "Pages: " + books.totalPages
        if(books.readStatus === true) {
            toggleButton.textContent = "Read"
        } else {
            toggleButton.textContent = "Not Read"
        }
    }

}

function clearBookCards() {
    while (bookContainer.lastChild) {
        bookContainer.removeChild(bookContainer.lastChild)
    }
}

function findBook(title) {
    let bookTitle = title.target.parentNode.parentNode.firstChild.innerHTML
    return myLibrary.find(book => book.title === bookTitle)
}

function deleteBook(title) {
    let deleteBook = findBook(title)
    myLibrary = myLibrary.filter(book => book != deleteBook)
    createCard()
}

function toggleRead(title) {
    let bookStatus = findBook(title)
    let toggleButton = title.target.parentNode
    if(bookStatus.readStatus === true) {
        bookStatus.readStatus = false
        toggleButton.textContent = "Not Read"
    } else {
        bookStatus.readStatus =  true
        toggleButton.textContent = "Read"
    }
    createCard()
}